const { objectResponse, statusCode } = require('../services/statusResponse');

const findArticles = (_req, res) => {
  return res.status(statusCode.OK).json(objectResponse(statusCode.OK, 'testing route'));
};

module.exports = {
  findArticles,
};
