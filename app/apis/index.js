const AuthApi = require('./auth.api');
const UserApi = require('./user.api');
const GroupApi = require('./group.api');
const ArtistApi = require('./artist.api');

module.exports = () => ({
  authApi: new AuthApi(),
  userApi: new UserApi(),
  groupApi: new GroupApi(),
  artistApi: new ArtistApi(),
});
