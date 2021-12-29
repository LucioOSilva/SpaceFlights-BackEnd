const articlesService = require('../services/articlesService');
const { articleDTOcreate, articleDTOupdate } = require('../services/dtos');

const findArticlesBypage = async (req, res, next) => {
  try {
    const { page } = req.query;
    const data = await articlesService.getArticlesByPage(page);
    if (data.message) throw data;
    return res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const findArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await articlesService.getArticleById(id);
    if (data.message) throw data;
    return res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const postOneArticle = async (req, res, next) => {
  try {
    const objDTO = articleDTOcreate(req.body);
    if (objDTO.message) throw objDTO;
    const data = await articlesService.postOneArticle(objDTO);
    if (data.message) throw data;
    return res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

const updateOneArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const objDTOvalid = articleDTOupdate(req.body);
    if (objDTOvalid.message) throw objDTOvalid;
    const data = await articlesService.updateOneArticle(id, objDTOvalid);
    if (data.message) throw data;
    return res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

const removeOneArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await articlesService.deleteOneArticle(id);
    if (data.message) throw data;
    return res.status(data.status).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findArticlesBypage,
  findArticleById,
  postOneArticle,
  updateOneArticle,
  removeOneArticle,
};
