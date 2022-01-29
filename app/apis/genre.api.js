const BaseApi = require('../BaseApi');

class GenreApi extends BaseApi {
  listGenres = (groupId) => (
    this.get(`/genre/${groupId}`)
  );

  createGenre = (groupId, data) => (
    this.post(`/genre/${groupId}`, data)
  );
}

module.exports = GenreApi;
