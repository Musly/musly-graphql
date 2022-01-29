module.exports = {
  Mutation: {
    login: (parent, args, context) => (
      context.dataSources.authApi.login(args)
    ),
    logout: (parent, args, context) => (
      context.dataSources.authApi.logout()
    ),
  },
};
