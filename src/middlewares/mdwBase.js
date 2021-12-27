const { objectResponse, statusCode } = require('../services/statusResponse');

const handshake = (_req, res) => {
  return res.status(statusCode.OK)
    .json(objectResponse(statusCode.OK, 'Fullstack Challenge 2021 🏅 - Space Flight News'));
};

module.exports = {
  handshake,
};
