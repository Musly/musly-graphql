import path from 'path';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { resolvers } from '../resolvers';
import { SentryApolloPlugin } from '../utils/SentryPlugin';
import { IS_DEVELOPMENT, IS_PRODUCTION } from '../constants';

export function connectGraphQL(): ApolloServer<ExpressContext> {
  // Load GraphQL Resolvers
  const schemaPath = path.join(__dirname, '..', 'schema.graphql');
  const schemaLoaderOptions = {
    loaders: [
      new GraphQLFileLoader(),
    ],
  };
  const schemaWithResolvers = addResolversToSchema({
    schema: loadSchemaSync(schemaPath, schemaLoaderOptions),
    resolvers,
  });

  // Set up GraphQL Server (Apollo Server)
  const server = new ApolloServer({
    schema: schemaWithResolvers,
    context: ({ req, res }) => ({ req, res }),
    debug: IS_DEVELOPMENT,
    plugins: [
      IS_PRODUCTION && SentryApolloPlugin(),
    ].filter(Boolean),
  });

  return server;
}
