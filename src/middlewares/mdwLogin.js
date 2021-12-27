const status = require('../services/statusCode');

const handshake = (_req, res) => {
  return res.status(status.OK).json({ message: 'Im awake!' });
};

module.exports = {
  handshake,
};
