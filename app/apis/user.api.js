const BaseApi = require('../BaseApi');

class UserApi extends BaseApi {
  createUser = async (data) => (
    this.post('/user', data)
  );

  fetchUser = async (userId) => (
    this.get(`/user/${encodeURIComponent(userId)}`)
  );

  updateUser = async (userId, data) => (
    this.patch(`/user/${encodeURIComponent(userId)}`, data)
  );

  deleteUser = async (userId) => (
    this.delete(`/user/${encodeURIComponent(userId)}`)
  );
}

module.exports = UserApi;
