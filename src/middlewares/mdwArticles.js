const articlesService = require('../services/articlesService');
const { statusCode } = require('../services/statusResponse');

const findArticlesBypage = async (req, res, next) => {
  try {
    const { page } = req.query;
    const data = await articlesService.getArticlesByPage(page);
    if (data.message) throw data;
    return res.status(statusCode.OK).json(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  findArticlesBypage,
};
