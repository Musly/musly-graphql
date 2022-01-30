module.exports = {
  Query: {
    groups: async (parent, args, context) => (
      context.dataSources.groupApi.listGroups()
    ),
    group: async (parent, args, context) => {
      const response = await context.dataSources.groupApi.fetchGroup(args.groupId);
      return response.group || null;
    },
  },
  Mutation: {
    createGroup: async (parent, args, context) => (
      context.dataSources.groupApi.createGroup(args)
    ),
    updateGroup: async (parent, { id, ...group }, context) => (
      context.dataSources.groupApi.updateGroup(id, group)
    ),
    deleteGroup: async (parent, args, context) => (
      context.dataSources.groupApi.deleteGroup(args.id)
    ),
  },
  User: {
    groups: async (parent, args, context) => {
      const response = await context.dataSources.groupApi.listGroups();
      return response.results || [];
    },
  },
};
