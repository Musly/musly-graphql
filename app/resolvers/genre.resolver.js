module.exports = {
  Query: {
    genres: async (parent, args, context) => (
      context.dataSources.genreApi.listGenres(args.groupId)
    ),
  },
  Mutation: {
    createGenre: async (parent, { groupId, ...data }, context) => (
      context.dataSources.genreApi.createGenre(groupId, data)
    ),
  },
  Group: {
    genres: async (parent, args, context) => {
      const response = await context.dataSources.genreApi.listGenres(parent.id);
      return response.results || [];
    },
  },
};
