module.exports = {
  Query: {
    artists: async (parent, { groupId }, context) => (
      context.dataSources.artistApi.listArtists(groupId)
    ),
  },
  Mutation: {
    createArtist: async (parent, { groupId, ...data }, context) => (
      context.dataSources.artistApi.fetchArtist(groupId, data)
    ),
    updateArtist: async (parent, { groupId, id, ...data }, context) => (
      context.dataSources.artistApi.updateArtist(groupId, id, data)
    ),
    deleteArtist: async (parent, { groupId, id }, context) => (
      context.dataSources.artistApi.deleteArtist(groupId, id)
    ),
  },
  Song: {
    artist: async (parent, args, context) => (
      context.dataSources.artistApi.fetchArtist(parent.groupId, parent.id)
    ),
  },
  Group: {
    artists: async (parent, args, context) => {
      const response = await context.dataSources.artistApi.listArtists(parent.id);
      return response.results || [];
    },
  },
};
