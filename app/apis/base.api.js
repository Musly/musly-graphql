const { RESTDataSource } = require('apollo-datasource-rest');
const { API_URL } = require('../constants');

module.exports = class BaseAPI extends RESTDataSource {
  constructor () {
    super();
    this.baseURL = API_URL;
  }

  willSendRequest (request) {
    request.headers.set('Authorization', this.context.req.headers.authorization);
  }
};
