const BaseApi = require('../BaseApi');

class GenreApi extends BaseApi {
  listGenres = async (groupId) => (
    this.get(`/genre/${groupId}`)
  );

  createGenre = async (groupId, data) => (
    this.post(`/genre/${groupId}`, data)
  );
}

module.exports = GenreApi;
