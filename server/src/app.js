import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';

import apiRoutes from './routes/index.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { logger } from './utils/logger.js';

export function createApp() {
  const app = express();

  app.set('trust proxy', 1);

  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(mongoSanitize());

  // Production origin is always allowed; additional origins can be injected via
  // the CLIENT_ORIGIN env var (comma-separated) for staging / local dev.
  const allowedOrigins = new Set([
    'http://localhost:5173',
    'http://localhost:5174',
    'https://nfinity-partner.vercel.app',
    ...((process.env.CLIENT_ORIGIN || '').split(',').map((o) => o.trim()).filter(Boolean)),
  ]);

  app.use(
    cors({
      origin(origin, callback) {
        // Allow tools like curl/Postman (no Origin header) and any configured origin.
        if (!origin || allowedOrigins.has(origin)) return callback(null, true);
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      },
      credentials: true,
    })
  );

  app.use(
    morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', {
      stream: { write: (msg) => logger.http?.(msg.trim()) || logger.info(msg.trim()) },
    })
  );

  app.get('/health', (req, res) => res.json({ success: true, message: 'OK', uptime: process.uptime() }));

  // ── Cache-Control for read-only API responses ────────────────────────────
  // Content collections (services, case studies, testimonials, blog) change
  // infrequently. Allowing browsers and CDN edges to cache GET responses for
  // 5 minutes with a 10-minute stale-while-revalidate window means returning
  // users get instant page loads from cache while content stays reasonably fresh.
  // POST/PATCH (lead submissions, form posts) are not affected.
  app.use('/api/v1', (req, res, next) => {
    if (req.method === 'GET') {
      res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    } else {
      res.set('Cache-Control', 'no-store');
    }
    next();
  });

  app.use('/api/v1', apiLimiter, apiRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export default createApp;
