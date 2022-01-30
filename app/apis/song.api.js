const BaseApi = require('../BaseApi');

class SongApi extends BaseApi {
  listSongs = async (groupId) => (
    this.get(`/song/${groupId}`)
  );

  createSong = async (groupId, data) => (
    this.post(`/song/${groupId}`, data)
  );

  fetchSong = async (groupId, id) => (
    this.get(`/song/${groupId}/${id}`)
  );

  updateSong = async (groupId, id, data) => (
    this.patch(`/song/${groupId}/${id}`, data)
  );

  deleteSong = async (groupId, id) => (
    this.delete(`/song/${groupId}/${id}`)
  );
}

module.exports = SongApi;
