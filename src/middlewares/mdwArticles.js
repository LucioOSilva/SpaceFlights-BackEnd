const articlesService = require('../services/articlesService');
const { statusCode } = require('../services/statusResponse');
const { articleDTO } = require('../services/dtos');

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

const findArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await articlesService.getArticleById(id);
    if (data.message) throw data;
    return res.status(statusCode.OK).json(data);
  } catch (error) {
    return next(error);
  }
};

const postOneArticle = async (req, res, next) => {
  try {
    const objDTO = articleDTO(req.body);
    if (objDTO.message) throw objDTO;
    const data = await articlesService.postOneArticle(objDTO);
    if (data.message) throw data;
    return res.status(statusCode.OK).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findArticlesBypage,
  findArticleById,
  postOneArticle,
};
