// Minimal fetch wrapper so every call to the backend goes through one place
// (base URL, JSON headers, and consistent error shape).

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export class ApiClientError extends Error {
  constructor(message, statusCode, details) {
    super(message);
    this.name = 'ApiClientError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

async function request(path, { method = 'GET', body, params } = {}) {
  let url = `${BASE_URL}${path}`;

  if (params && Object.keys(params).length > 0) {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
    );
    const qs = query.toString();
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    // Non-JSON response (e.g. network-level failure page) — payload stays null.
  }

  if (!res.ok) {
    throw new ApiClientError(payload?.message || `Request failed with status ${res.status}`, res.status, payload?.details);
  }

  return payload;
}

export const apiClient = {
  get: (path, params) => request(path, { method: 'GET', params }),
  post: (path, body) => request(path, { method: 'POST', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
};
