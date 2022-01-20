/* eslint-disable global-require */
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
const {
  IS_DEVELOPMENT, IS_PRODUCTION, SENTRY_DSN, SENTRY_ENV, PORT,
} = require('./constants');
const pkg = require('../package');
const getUser = require('./utils/getUser');
const { SentryApolloPlugin } = require('./utils/SentryPlugin');
const logger = require('./logger');

// TODO: Add redis caching: https://www.apollographql.com/docs/apollo-server/data/data-sources/#redis

Sentry.init({
  dsn: SENTRY_DSN,
  environment: SENTRY_ENV,
  release: `${pkg.name}@${pkg.version}`,
  tracesSampleRate: 1.0,
});

const server = new ApolloServer({
  // Load the schema and dynamically add resolvers.
  schema: addResolversToSchema({
    schema: loadSchemaSync(path.join(__dirname, 'schema.graphql'), {
      loaders: [
        new GraphQLFileLoader(),
      ],
    }),
    resolvers: require('./resolvers'),
  }),
  // Extending the context with the user
  context: ({ req, res }) => ({
    req, res, user: getUser(req),
  }),
  formatError: (error) => {
    if (error.extensions?.response?.body?.code) {
      return {
        status: error.extensions?.response.status,
        code: error.extensions?.response?.body?.code,
      };
    }

    return error;
  },
  debug: IS_DEVELOPMENT,
  dataSources: require('./apis'),
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
