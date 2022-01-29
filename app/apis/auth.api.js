const BaseApi = require('../BaseApi');

class AuthApi extends BaseApi {
  login = async (credentials) => (
    this.post('/auth/login', credentials)
  );

  logout = async () => (
    this.get('/auth/logout')
  );
}

module.exports = AuthApi;
