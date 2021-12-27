const express = require('express');
const mdw = require('../middlewares');

const loginRouter = express.Router();

loginRouter.get('/', mdw.mdwLogin.handshake);

module.exports = loginRouter;
