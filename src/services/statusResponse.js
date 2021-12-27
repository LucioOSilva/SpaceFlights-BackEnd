const statusCode = {
  OK: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  conflict: 409,
  unprocessableEntity: 422,
  internalServerError: 500,
};

const objectResponse = (status, message, data = null) => {
  return { status, message, data };
};

module.exports = {
  statusCode,
  objectResponse,
};
