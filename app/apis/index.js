const AuthApi = require('./auth.api');
const UserApi = require('./user.api');
const GroupApi = require('./group.api');
const ArtistApi = require('./artist.api');
const CommentApi = require('./comment.api');
const GenreApi = require('./genre.api');
const SongApi = require('./song.api');

module.exports = () => ({
  authApi: new AuthApi(),
  userApi: new UserApi(),
  groupApi: new GroupApi(),
  artistApi: new ArtistApi(),
  commentApi: new CommentApi(),
  genreApi: new GenreApi(),
  songApi: new SongApi(),
});
