const BaseApi = require('../BaseApi');

class UserApi extends BaseApi {
  createUser = (data) => (
    this.post('/user', data)
  );

  fetchUser = (userId) => (
    this.get(`/user/${encodeURIComponent(userId)}`)
  );

  updateUser = (userId, data) => (
    this.patch(`/user/${encodeURIComponent(userId)}`, data)
  );

  deleteUser = (userId) => (
    this.delete(`/user/${encodeURIComponent(userId)}`)
  );
}

module.exports = UserApi;
