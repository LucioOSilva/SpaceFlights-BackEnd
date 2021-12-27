const { objectResponse, statusCode } = require('./statusResponse');

function isInvalidNumber(number) {
  if (!number || Number.isNaN(number)) {
    return objectResponse(statusCode.badRequest, 'Error: field number must be a valid number');
  }
  return false;
}

module.exports = {
  isInvalidNumber,
};
