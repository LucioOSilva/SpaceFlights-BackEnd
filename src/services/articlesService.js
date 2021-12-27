require('dotenv/config');
const articlesModel = require('../models/articlesModel');
const verifier = require('./verifiers');
const { objectResponse, statusCode } = require('./statusResponse');

async function totalpages(page) {
  const pageSelected = Number(page);
  const maxItemsPerPage = 10;
  const countedDocuments = await articlesModel.getAllArticlesCount();
  const lastPage = Math.ceil(countedDocuments / maxItemsPerPage);
  const objPage = {
    pageSelected,
    lastPage,
  };
  if (pageSelected === 0 || pageSelected > lastPage) return false;
  return objPage;
}

async function getOneArticle(id) {
  const data = await articlesModel.getOneArticle({ id });
  if (!data) return {};
  return data;
}

async function getArticlesByPage(page) {
  try {
    if (verifier.isInvalidNumber(page)) throw new Error();
    const pages = await totalpages(page);
    if (!pages) throw new Error();
    const data = await articlesModel.getArticlesByPage(pages.pageSelected - 1);
    const objResponse = { articles: data, pages };
    return objectResponse(statusCode.OK, null, objResponse);
  } catch (error) {
    return objectResponse(statusCode.badRequest, "The requested page doesn't exists");
  }
}

module.exports = {
  getOneArticle,
  getArticlesByPage,
};
