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

const getAllArticlesCount = async () => {
  const articles = await connection()
    .then((db) => db.collection('articles').count());
  return articles;
};

const getArticlesByPage = async (page) => {
  const numberPerPage = 10;
  const skipNumber = page * numberPerPage;
  const articles = await connection()
    .then((db) => db.collection('articles')
      .find()
      .skip(skipNumber)
      .limit(numberPerPage)
      .toArray());
  return articles;
};

const upsertManyArticles = async (arrayOfArticles) => {
  const articles = await connection()
    .then((db) => {
      arrayOfArticles.forEach((document) => {
        db.collection('articles').updateMany({ id: document.id }, { $set: document }, { upsert: true });
      });
    });
  return articles;
};

const postOneArticle = async (articleDTO) => {
  console.log('model', articleDTO);
  const articles = await connection()
    .then((db) => db.collection('articles').insertOne(articleDTO, { writeConcern: { w: 'majority', wtimeout: 500 } }));
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
  getAllArticlesCount,
  getArticlesByPage,
  upsertManyArticles,
  postOneArticle,
  putManyArticles,
  deleteAllData,
};
