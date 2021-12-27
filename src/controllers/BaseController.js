const express = require('express');
const { mdwBase } = require('../middlewares');

const baseRouter = express.Router();

baseRouter.get('/', mdwBase.handshake);

module.exports = baseRouter;
