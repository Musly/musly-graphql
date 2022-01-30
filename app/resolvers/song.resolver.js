module.exports = {
  Query: {
    songs: async (parent, { groupId }, context) => (
      context.dataSources.songApi.listSongs(groupId)
    ),
    song: async (parent, { groupId, songId }, context) => {
      const response = await context.dataSources.songApi.fetchSong(groupId, songId);
      return response.song || null;
    },
  },
  Mutation: {
    createSong: async (parent, { groupId, ...data }, context) => (
      context.dataSources.songApi.createSong(groupId, data)
    ),
    updateSong: async (parent, { groupId, id, ...data }, context) => (
      context.dataSources.songApi.updateSong(groupId, id, data)
    ),
    deleteSong: async (parent, { groupId, id }, context) => (
      context.dataSources.songApi.deleteSong(groupId, id)
    ),
  },
  Group: {
    songs: async (parent, args, context) => {
      const response = await context.dataSources.songApi.listSongs(parent.id);
      return response.results || [];
    },
  },
};
