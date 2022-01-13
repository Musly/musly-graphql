const path = require('path');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { loadSchemaSync } = require('@graphql-tools/load');
const { addResolversToSchema } = require('@graphql-tools/schema');
const { ApolloServer } = require('apollo-server');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} = require('apollo-server-core');
const Sentry = require('@sentry/node');
const { resolvers } = require('./resolvers');
const {
  IS_DEVELOPMENT, IS_PRODUCTION, SENTRY_DSN, SENTRY_ENV, PORT,
} = require('./constants');
const pkg = require('../package');
const { SentryApolloPlugin } = require('./utils/SentryPlugin');
const logger = require('./logger');

Sentry.init({
  dsn: SENTRY_DSN,
  environment: SENTRY_ENV,
  release: `${pkg.name}@${pkg.version}`,
  tracesSampleRate: 1.0,
});

const schemaPath = path.join(__dirname, 'schema.graphql');
const schemaLoaderOptions = {
  loaders: [
    new GraphQLFileLoader(),
  ],
};
const schemaWithResolvers = addResolversToSchema({
  schema: loadSchemaSync(schemaPath, schemaLoaderOptions),
  resolvers,
});

const server = new ApolloServer({
  schema: schemaWithResolvers,
  debug: IS_DEVELOPMENT,
  plugin: [
    SentryApolloPlugin(),
    IS_DEVELOPMENT && ApolloServerPluginLandingPageGraphQLPlayground(),
    IS_PRODUCTION && ApolloServerPluginLandingPageDisabled(),
  ].filter(Boolean),
});

server.listen({ port: PORT, host: '0.0.0.0' })
  .then(({ url }) => {
    logger.log(`🚀 Server ready at ${url}\n`);
  })
  .catch((err) => {
    Sentry.captureException(err);
    process.exit(1);
  });
