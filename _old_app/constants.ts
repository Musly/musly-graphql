import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const ENV_KEY_DEVELOPMENT = 'development';
const ENV_KEY_TEST = 'test';
const ENV_KEY_PRODUCTION = 'production';

export const ENV = process.env.NODE_ENV || ENV_KEY_DEVELOPMENT;

export const DB_URL = process.env.MUSLY_API_DB_URL;
export const DB_NAME = process.env.MUSLY_API_DB_NAME;
export const DB_USER = process.env.MUSLY_API_DB_USERNAME;
export const DB_PASS = process.env.MUSLY_API_DB_PASSWORD;
export const PORT = process.env.MUSLY_API_PORT || process.env.PORT || 5000;
export const TOKEN_SECRET = process.env.MUSLY_API_TOKEN_SECRET;
export const SENTRY_DSN = process.env.MUSLY_API_SENTRY_DSN;
export const SENTRY_ENV = process.env.MUSLY_API_SENTRY_ENVIRONMENT;

export const IS_TEST = ENV === ENV_KEY_TEST;
export const IS_DEVELOPMENT = ENV === ENV_KEY_DEVELOPMENT;
export const IS_PRODUCTION = ENV === ENV_KEY_PRODUCTION;
