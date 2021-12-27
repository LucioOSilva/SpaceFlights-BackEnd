// usersModel
const connection = require('./connection');

const getOneArticle = async (objSearch) => {
  const articles = await connection()
    .then((db) => db.collection('articles').findOne(objSearch));
  return articles;
};

const getAllArticles = async () => {
  const articles = await connection()
    .then((db) => db.collection('articles').find().toArray());
  return articles;
};

const putManyArticles = async (arrayOfArticles) => {
  const articles = await connection()
    .then((db) => db.collection('articles').insertMany(arrayOfArticles));
  return articles;
};

const deleteAllData = async () => {
  const articles = await connection()
    .then((db) => db.dropDatabase());
  return articles;
};

module.exports = {
  getOneArticle,
  getAllArticles,
  putManyArticles,
  deleteAllData,
};
