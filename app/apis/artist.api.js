const BaseApi = require('../BaseApi');

class ArtistApi extends BaseApi {
  listArtists = (groupId) => (
    this.get(`/artist/${groupId}`)
  );

  fetchArtist = (groupId, id) => (
    this.get(`/artist/${groupId}/${id}`)
  );

  createArtist = (groupId, data) => (
    this.post(`/artist/${groupId}`, data)
  );

  updateArtist = (groupId, id, data) => (
    this.patch(`/artist/${groupId}/${id}`, data)
  );

  deleteArtist = (groupId, id) => (
    this.delete(`/artist/${groupId}/${id}`)
  );
}

module.exports = ArtistApi;
