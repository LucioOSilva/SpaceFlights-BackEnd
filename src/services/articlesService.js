// emailService
require('dotenv/config');
const articlesModel = require('../models/articlesModel');

// const objectError = (status, message) => {
//   return { status, message };
// };

async function getOneArticle(id) {
  const data = await articlesModel.getOneArticle({ id });
  if (!data) return {};
  return data;
}

async function getAllArticles() {
  const data = await articlesModel.getAllArticles();
  return data;
}

module.exports = {
  getOneArticle,
  getAllArticles,
};
