require('dotenv').config();

const ENV_KEY_DEVELOPMENT = 'development';
const ENV_KEY_TEST = 'test';
const ENV_KEY_PRODUCTION = 'production';

exports.ENV = process.env.NODE_ENV || ENV_KEY_DEVELOPMENT;
exports.PORT = process.env.PORT || 3001;
exports.API_URL = process.env.MUSLY_API_URL || 'http://localhost:3000';
exports.TOKEN_SECRET = process.env.MUSLY_API_TOKEN_SECRET;
exports.TOKEN_ALGORITHM = 'HS256';

exports.SENTRY_DSN = process.env.MUSLY_API_SENTRY_DSN;
exports.SENTRY_ENV = process.env.MUSLY_API_SENTRY_ENVIRONMENT;

exports.IS_TEST = exports.ENV === ENV_KEY_TEST;
exports.IS_DEVELOPMENT = exports.ENV === ENV_KEY_DEVELOPMENT;
exports.IS_PRODUCTION = exports.ENV === ENV_KEY_PRODUCTION;
