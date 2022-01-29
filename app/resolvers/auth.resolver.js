module.exports = {
  Mutation: {
    login: async (parent, args, context) => (
      context.dataSources.authApi.login(args)
    ),
    logout: async (parent, args, context) => (
      context.dataSources.authApi.logout()
    ),
  },
};
