import { ApiError } from '../utils/ApiError.js';

// Generic Zod validation middleware. Pass a schema shaped like
// z.object({ body: ..., params: ..., query: ... }) and only the
// keys you define get validated/replaced.
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.slice(1).join('.'),
      message: issue.message,
    }));
    return next(ApiError.badRequest('Validation failed', details));
  }

  if (result.data.body) req.body = result.data.body;
  if (result.data.query) req.query = result.data.query;
  next();
};

export default validate;
