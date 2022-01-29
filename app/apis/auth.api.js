const BaseApi = require('../BaseApi');

class AuthApi extends BaseApi {
  login = (credentials) => (
    this.post('/auth/login', credentials)
  );

  logout = () => (
    this.get('/auth/logout')
  );
}

module.exports = AuthApi;
