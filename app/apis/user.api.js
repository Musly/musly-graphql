const BaseAPI = require('./base.api');

module.exports = class UserAPI extends BaseAPI {
  createUser = (user) => (
    this.post('/user', user)
  );

  getUserById = (id) => (
    this.get(`/user/${encodeURIComponent(id)}`)
  );

  updateUserById = (id, user) => (
    this.patch(`/user/${encodeURIComponent(id)}`, user)
  );

  deleteUserById = (id) => (
    this.delete(`/user/${encodeURIComponent(id)}`)
  );

  loginUser = (credentials) => (
    this.post('/user/login', credentials)
  );

  logoutUser = () => (
    this.get('/user/logout')
  );
};
