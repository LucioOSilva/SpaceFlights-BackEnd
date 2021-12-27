const express = require('express');
const mdw = require('../middlewares');

const loginRouter = express.Router();

loginRouter.get('/handshake', mdw.mdwLogin.handshake);

module.exports = loginRouter;
