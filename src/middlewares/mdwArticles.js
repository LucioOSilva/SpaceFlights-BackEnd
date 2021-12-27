const status = require('../services/statusCode');

const findArticles = (_req, res) => {
  return res.status(status.OK).json({ message: 'test' });
};

module.exports = {
  findArticles,
};
