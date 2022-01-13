const { ApolloError } = require('apollo-server');
const Sentry = require('@sentry/node');
const { verify } = require('jsonwebtoken');

exports.SentryApolloPlugin = function SentryApolloPlugin () {
  return {
    async requestDidStart () {
      /* Within this returned object, define functions that respond
           to request-specific lifecycle events. */
      return {
        async didEncounterErrors (ctx) {
          // If we couldn't parse the operation, don't
          // do anything here
          if (!ctx.operation) {
            return;
          }

          ctx.errors.forEach((err) => {
            // Only report internal server errors,
            // all errors extending ApolloError should be user-facing
            if (err instanceof ApolloError) {
              return;
            }

            if (ctx.request.http.headers.get('authorization')) {
              const token = verify(ctx.request.http.headers.get('authorization'), `${process.env.MUSLY_API_TOKEN_SECRET}`);

              Sentry.setUser({
                id: token.userId,
                email: token.userEmail,
              });
            }

            // Add scoped report details and send to Sentry
            Sentry.withScope((scope) => {
              // Annotate whether failing operation was query/mutation/subscription
              scope.setTag('kind', ctx.operation.operation);

              // Log query and variables as extras (make sure to strip out sensitive data!)
              scope.setExtra('query', ctx.request.query);
              scope.setExtra('variables', ctx.request.variables);

              if (err.path) {
                // We can also add the path as breadcrumb
                scope.addBreadcrumb({
                  category: 'query-path',
                  message: err.path.join(' > '),
                  level: Sentry.Severity.Debug,
                });
              }

              const transactionId = ctx.request.http.headers.get('x-transaction-id');

              if (transactionId) {
                scope.setTransaction(transactionId);
              }

              Sentry.captureException(err);
            });
          });
        },
      };
    },
  };
};
