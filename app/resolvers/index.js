/* eslint-disable global-require */
const { buildResolvers } = require('../utils/buildResolvers');

exports.resolvers = buildResolvers([
  require('./user.resolver'),
]);
