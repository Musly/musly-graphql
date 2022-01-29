const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, TOKEN_ALGORITHM } = require('../constants');

function getUser (req) {
  if (!req.headers.authorization) {
    return null;
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    return jwt.verify(token, TOKEN_SECRET, { algorithms: [TOKEN_ALGORITHM] });
  } catch (error) {
    return null;
  }
}

module.exports = getUser;
