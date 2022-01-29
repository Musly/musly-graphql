module.exports = {
  Query: {
    me: async (parent, args, context) => (
      context.dataSources.userApi.fetchUser(context.user.id)
    ),
  },
  Mutation: {
    signup: async (parent, args, context) => (
      context.dataSources.userApi.createUser(args)
    ),
    updateUser: async (parent, { id, ...userData }, context) => (
      context.dataSources.userApi.updateUser(id, userData)
    ),
    deleteUser: async (parent, args, context) => (
      context.dataSources.userApi.deleteUser(args.id)
    ),
  },
  Group: {
    manager: (parent, args, context) => (
      context.dataSources.userApi.fetchUser(parent.managerId)
    ),
  },
};
