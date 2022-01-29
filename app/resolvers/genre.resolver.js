module.exports = {
  Query: {
    genres: (parent, args, context) => (
      context.dataSources.genreApi.listGenres(args.groupId)
    ),
  },
  Mutation: {
    createGenre: (parent, { groupId, ...data }, context) => (
      context.dataSources.genreApi.createGenre(groupId, data)
    ),
  },
};
