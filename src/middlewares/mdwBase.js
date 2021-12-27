const { objectResponse, statusCode } = require('../services/statusResponse');

const handshake = (_req, res, next) => {
  try {
    return res.status(statusCode.OK)
      .json(objectResponse(statusCode.OK, 'Fullstack Challenge 2021 🏅 - Space Flight News'));
  } catch (error) {
    next(objectResponse(statusCode
      .internalServerError, 'something wrong happened with your request try it on few seconds'));
  }
};

module.exports = {
  handshake,
};
