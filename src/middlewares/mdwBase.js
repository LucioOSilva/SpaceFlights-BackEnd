const status = require('../services/statusCode');

const handshake = (_req, res) => {
  return res.status(status.OK).json({ message: 'Fullstack Challenge 2021 🏅 - Space Flight News' });
};

module.exports = {
  handshake,
};
