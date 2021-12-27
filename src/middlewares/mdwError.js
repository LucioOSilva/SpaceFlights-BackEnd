const { objectResponse, statusCode } = require('../services/statusResponse');

const errorMiddleware = (error, _req, res, _next) => {
  if (error.status) {
    return res.status(error.status)
      .json(objectResponse(error.status, error.message));
  }
  return res.status(statusCode.internalServerError)
    .json(objectResponse(statusCode.internalServerError, `Internal server error: ${error.message}`));
};

module.exports = { errorMiddleware };
