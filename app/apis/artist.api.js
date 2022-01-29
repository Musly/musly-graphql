const BaseApi = require('../BaseApi');

class ArtistApi extends BaseApi {
  listArtists = async (groupId) => (
    this.get(`/artist/${groupId}`)
  );

  fetchArtist = async (groupId, id) => (
    this.get(`/artist/${groupId}/${id}`)
  );

  createArtist = async (groupId, data) => (
    this.post(`/artist/${groupId}`, data)
  );

  updateArtist = async (groupId, id, data) => (
    this.patch(`/artist/${groupId}/${id}`, data)
  );

  deleteArtist = async (groupId, id) => (
    this.delete(`/artist/${groupId}/${id}`)
  );
}

module.exports = ArtistApi;
