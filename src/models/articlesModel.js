// usersModel
const connection = require('./connection');

const getOneArticle = async (objSearch) => {
  const user = await connection()
    .then((db) => db.collection('articles').findOne(objSearch));
  return user;
};

const getAllArticles = async () => {
  const users = await connection()
    .then((db) => db.collection('articles').find().toArray());
  return users;
};

const putManyArticles = async (arrayOfArticles) => {
  const users = await connection()
    .then((db) => db.collection('articles').insertMany(arrayOfArticles));
  return users;
};

module.exports = {
  getOneArticle,
  getAllArticles,
  putManyArticles,
};
