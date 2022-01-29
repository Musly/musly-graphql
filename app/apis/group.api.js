const BaseApi = require('../BaseApi');

class GroupApi extends BaseApi {
  listGroups = () => (
    this.get('/group')
  );

  createGroup = (data) => (
    this.post('/group', data)
  );

  updateGroup = (groupId, data) => (
    this.patch(`/group/${groupId}`, data)
  );

  deleteGroup = (groupId) => (
    this.delete(`/group/${groupId}`)
  );
}

module.exports = GroupApi;
