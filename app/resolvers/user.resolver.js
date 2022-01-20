module.exports = {
  Query: {
    me: (parent, args, context) => (
      context.dataSources.userAPI.getUserById(context.user.id)
    ),
  },
  Mutation: {
    signup: (parent, args, context) => (
      context.dataSources.userAPI.createUser(args)
    ),
    login: (parent, args, context) => (
      context.dataSources.userAPI.loginUser(args)
    ),
    logout: (parent, args, context) => (
      context.dataSources.userAPI.logoutUser()
    ),
    updateUser: (parent, { id, ...userData }, context) => (
      context.dataSources.userAPI.updateUser(id, userData)
    ),
    deleteUser: (parent, args, context) => (
      context.dataSources.userAPI.deleteUserById(args.id)
    ),
  },
};
