module.exports = {
  Query: {
    groups: (parent, args, context) => (
      context.dataSources.groupApi.listGroups()
    ),
  },
  Mutation: {
    createGroup: (parent, args, context) => (
      context.dataSources.groupApi.createGroup(args)
    ),
    updateGroup: (parent, { id, ...group }, context) => (
      context.dataSources.groupApi.updateGroup(id, group)
    ),
    deleteGroup: (parent, args, context) => (
      context.dataSources.groupApi.deleteGroup(args.id)
    ),
  },
};
