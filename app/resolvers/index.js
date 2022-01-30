const { buildResolvers } = require('../utils/buildResolvers');

const resolvers = buildResolvers([
  require('./auth.resolver'),
  require('./user.resolver'),
  require('./group.resolver'),
  require('./artist.resolver'),
  require('./comment.resolver'),
  require('./genre.resolver'),
  require('./song.resolver'),
]);

console.log(resolvers);

module.exports = resolvers;
