// Minimal fetch wrapper — single point for base URL, JSON headers, and errors.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export class ApiClientError extends Error {
  constructor(message, statusCode, details) {
    super(message);
    this.name = 'ApiClientError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

// ── GET cache ──────────────────────────────────────────────────────────────
//
// Two structures solve two independent problems:
//
//   _cache     → time-based cache so repeated navigations to the same page
//                (or re-mounts due to React.StrictMode) don't make fresh
//                network requests within the TTL window.
//
//   _inflight  → deduplication for *concurrent* requests.  Multiple components
//                that mount at the same time and call the same endpoint each
//                see one shared Promise instead of N parallel fetches.
//
// Both are module-level Maps so they persist across component unmounts.
// The cache is intentionally in-memory (not localStorage) to avoid stale
// data across page refreshes or deploys.
//
const _cache    = new Map(); // url → { payload, expires }
const _inflight = new Map(); // url → Promise

// Content (services, case studies, testimonials) changes infrequently.
// 5-minute TTL is a good balance between freshness and avoiding duplicate calls.
const CACHE_TTL_MS = 5 * 60 * 1000;

function buildUrl(path, params) {
  let url = `${BASE_URL}${path}`;
  if (params && Object.keys(params).length > 0) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
    ).toString();
    if (qs) url += `?${qs}`;
  }
  return url;
}

async function parseResponse(res) {
  let payload = null;
  try {
    payload = await res.json();
  } catch {
    // Non-JSON body (network failure page, etc.)
  }
  if (!res.ok) {
    throw new ApiClientError(
      payload?.message || `Request failed with status ${res.status}`,
      res.status,
      payload?.details,
    );
  }
  return payload;
}

async function request(path, { method = 'GET', body, params } = {}) {
  const url = buildUrl(path, params);

  // ── Cached GET path ──────────────────────────────────────────────────────
  if (method === 'GET') {
    // 1. Return cached payload if still within TTL.
    const hit = _cache.get(url);
    if (hit && Date.now() < hit.expires) return hit.payload;

    // 2. Return the in-flight Promise if an identical request is already running.
    if (_inflight.has(url)) return _inflight.get(url);

    // 3. Fire the actual request, cache on success, clean up on both paths.
    const promise = fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (res) => {
        const payload = await parseResponse(res);
        _cache.set(url, { payload, expires: Date.now() + CACHE_TTL_MS });
        _inflight.delete(url);
        return payload;
      })
      .catch((err) => {
        _inflight.delete(url);
        throw err;
      });

    _inflight.set(url, promise);
    return promise;
  }

  // ── Non-GET path (POST / PATCH) — always live ────────────────────────────
  return fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  }).then(parseResponse);
}

export const apiClient = {
  get:   (path, params) => request(path, { method: 'GET', params }),
  post:  (path, body)   => request(path, { method: 'POST', body }),
  patch: (path, body)   => request(path, { method: 'PATCH', body }),
};
