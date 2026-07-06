import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './src/app.js';
import { connectDB } from './src/config/db.js';
import { logger } from './src/utils/logger.js';

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  const app = createApp();

  const server = app.listen(PORT, () => {
    logger.info(`Nfinity Partner API running on port ${PORT} (${process.env.NODE_ENV || 'development'})`);
  });

  const shutdown = (signal) => {
    logger.info(`${signal} received. Shutting down gracefully...`);
    server.close(() => {
      logger.info('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  process.on('unhandledRejection', (reason) => {
    logger.error(`Unhandled rejection: ${reason}`);
  });
}

start();
