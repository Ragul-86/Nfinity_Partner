import { ApiError } from '../utils/ApiError.js';

// Temporary stop-gap guard for lead-read/update endpoints until the Phase 2
// admin panel ships with proper JWT + role-based auth (see Section 4 of the
// master architecture doc). Set INTERNAL_API_KEY in .env and send it as the
// `x-internal-key` header from any internal tool (e.g. a Postman/CRM sync)
// that needs to read leads. Without this, lead PII (name/email/phone) would
// be publicly readable, which is not acceptable even for an MVP.
export function requireInternalKey(req, res, next) {
  const configuredKey = process.env.INTERNAL_API_KEY;

  if (!configuredKey) {
    // Fail closed: if no key is configured, block access rather than
    // silently exposing lead data.
    return next(ApiError.forbidden('Lead management endpoints are not configured. Set INTERNAL_API_KEY.'));
  }

  const providedKey = req.headers['x-internal-key'];
  if (providedKey !== configuredKey) {
    return next(ApiError.unauthorized('Invalid or missing internal API key'));
  }

  next();
}

export default requireInternalKey;
