import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    logger.error('MONGO_URI is not set. Add it to your .env file (see .env.example).');
    process.exit(1);
  }

  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(uri);
    logger.info(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    logger.error(`MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected');
  });
}

export default connectDB;
