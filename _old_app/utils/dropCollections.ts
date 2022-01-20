import mongoose from 'mongoose';
import { logger } from './logger';

export async function dropCollections(): Promise<void[]> {
  return Promise.all(Object.keys(mongoose.connection.collections).map(async(collectionName) => {
    try {
      await mongoose.connection.collections[collectionName].drop();
      logger.warn(`Collection dropped: ${collectionName}`);
    } catch (err) {
      logger.error(`${collectionName} could not be dropped!`);
    }
  }));
}
