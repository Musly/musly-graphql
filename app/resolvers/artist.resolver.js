module.exports = {
  Query: {
    artists: (parent, { groupId }, context) => (
      context.dataSources.artistApi.listArtists(groupId)
    ),
  },
  Mutation: {
    createArtist: (parent, { groupId, ...data }, context) => (
      context.dataSources.artistApi.fetchArtist(groupId, data)
    ),
    updateArtist: (parent, { groupId, id, ...data }, context) => (
      context.dataSources.artistApi.updateArtist(groupId, id, data)
    ),
    deleteArtist: (parent, { groupId, id }, context) => (
      context.dataSources.artistApi.deleteArtist(groupId, id)
    ),
  },
  Song: {
    artist: (parent, args, context) => (
      context.dataSources.artistApi.fetchArtist(parent.groupId, parent.id)
    ),
  },
  Group: {
    artists: (parent, args, context) => (
      context.dataSources.artistApi.fetchArtist(parent.id)
    ),
  },
};
