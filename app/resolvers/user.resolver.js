module.exports = {
  Query: {
    me: (parent, args, context) => (
      context.dataSources.userApi.fetchUser(context.user.id)
    ),
  },
  Mutation: {
    signup: (parent, args, context) => (
      context.dataSources.userApi.createUser(args)
    ),
    updateUser: (parent, { id, ...userData }, context) => (
      context.dataSources.userApi.updateUser(id, userData)
    ),
    deleteUser: (parent, args, context) => (
      context.dataSources.userApi.deleteUser(args.id)
    ),
  },
  Group: {
    manager: (parent, args, context) => (
      context.dataSources.userApi.fetchUser(parent.managerId)
    ),
  },
};
