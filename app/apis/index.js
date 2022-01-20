const UserAPI = require('./user.api');

module.exports = () => ({
  userAPI: new UserAPI(),
});
