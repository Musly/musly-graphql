const { RESTDataSource } = require('apollo-datasource-rest');
const { API_URL } = require('./constants');

class BaseApi extends RESTDataSource {
  constructor () {
    super();
    this.baseURL = API_URL;
  }

  willSendRequest (request) {
    request.headers.set('Authorization', this.context.req.headers.authorization);
  }
}

module.exports = BaseApi;
