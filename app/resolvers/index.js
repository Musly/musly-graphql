const { buildResolvers } = require('../utils/buildResolvers');

module.exports = buildResolvers([
  require('./auth.resolver'),
  require('./user.resolver'),
  require('./group.resolver'),
  require('./artist.resolver'),
  require('./comment.resolver'),
  require('./genre.resolver'),
]);
