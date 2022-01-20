/* eslint-disable global-require */
const { buildResolvers } = require('../utils/buildResolvers');

module.exports = buildResolvers([
  require('./user.resolver'),
]);
