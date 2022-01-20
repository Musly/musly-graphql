import mongoose from 'mongoose';
import * as Sentry from '@sentry/node';
import { logger } from './utils/logger';
import { dropCollections } from './utils/dropCollections';
import {
  DB_URL, DB_NAME, IS_TEST, PORT, ENV, IS_DEVELOPMENT,
} from './constants';
import { connectGraphQL } from './server/graphql';
import { createHttpServer } from './server/httpServer';

const connectURL = `${DB_URL}${DB_NAME}-${ENV}`;

/**
 * Connects to the database.
 */
async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectURL, { autoIndex: true });
    logger.log(`🪣  Connected to the database at ${connectURL}`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

/**
 * Starts the http server.
 */
export async function start(): Promise<void> {
  try {
    await connectDatabase();

    if (IS_TEST) {
      // Drop all collections for testing, to have a fresh DB.
      await dropCollections();
    }

    const server = connectGraphQL();
    const app = createHttpServer();

    // Start Apollo Serveer
    await server.start();
    server.applyMiddleware({ app, path: '/' });

    const host = IS_DEVELOPMENT ? 'http://localhost' : '*';
    const httpServer = app.listen({ port: PORT }, () => {
      logger.log(`🚀 Server ready at ${host}:${PORT}${server.graphqlPath}\n`);
    });

    // Handle signal termination
    process.on('SIGTERM', () => {
      logger.log('\nSIGTERM signal received: closing HTTP server ...');

      mongoose.connection.close();
      httpServer.close(() => {
        logger.log('... HTTP server closed\n');
      });
    });
  } catch (error) {
    Sentry.captureException(error);
    logger.error(error);
  }
}
