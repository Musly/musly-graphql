const BaseApi = require('../BaseApi');

class GroupApi extends BaseApi {
  listGroups = async () => (
    this.get('/group')
  );

  createGroup = async (data) => (
    this.post('/group', data)
  );

  fetchGroup = async (groupId) => (
    this.get(`/group/${groupId}`)
  );

  updateGroup = async (groupId, data) => (
    this.patch(`/group/${groupId}`, data)
  );

  deleteGroup = async (groupId) => (
    this.delete(`/group/${groupId}`)
  );
}

module.exports = GroupApi;
