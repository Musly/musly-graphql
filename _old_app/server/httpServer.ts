import express from 'express';
import cors from 'cors';
import compression from 'compression';
import * as Sentry from '@sentry/node';
import { IS_PRODUCTION, SENTRY_DSN, SENTRY_ENV } from '../constants';

export function createHttpServer(): express.Express {
  const app = express();
  app
    .use(cors({
      origin: [
        'http://localhost',
        'http://localhost:8080',
        'https://in.musly.app',
        'https://musly.app',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      credentials: true,
    }))
    .use(compression());

  if (IS_PRODUCTION) {
    Sentry.init({
      dsn: SENTRY_DSN,
      environment: SENTRY_ENV,
    });

    app
      .use(Sentry.Handlers.requestHandler() as express.RequestHandler)
      .use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  app.use(function onError(err, req, res, next) {
    Sentry.captureException(err);
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(`${res.sentry }\n`);
  });

  return app;
}
