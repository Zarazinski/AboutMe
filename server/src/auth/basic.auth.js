const basicAuth = require('express-basic-auth');
const users = { users: { 'admin': 'admin' } };
const authMiddleware = basicAuth(users);

module.exports = authMiddleware;
