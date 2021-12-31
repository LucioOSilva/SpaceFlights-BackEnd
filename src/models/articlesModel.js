// articlesModel
const connection = require('./connection');

const getOneArticle = async (objSearch) => {
  const mongoConnection = await connection();
  const articles = mongoConnection.then((db) => db.collection('articles').findOne(objSearch));
  mongoConnection.then((db) => db.close());
  return articles;
};

const getAllArticles = async () => {
  const mongoConnection = await connection();
  const articles = mongoConnection.then((db) => db.collection('articles').find().toArray());
  mongoConnection.then((db) => db.close());
  return articles;
};

const getAllArticlesCount = async () => {
  const mongoConnection = await connection();
  const articles = mongoConnection.then((db) => db.collection('articles').count());
  mongoConnection.then((db) => db.close());
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
  const mongoConnection = await connection();
  const articles = mongoConnection.then((db) => {
    arrayOfArticles.forEach((document) => {
      db.collection('articles').updateMany({ id: document.id }, { $set: document }, { upsert: true });
    });
  });
  mongoConnection.then((db) => db.close());
  return articles;
};

const postOneArticle = async (articleDTO) => {
  const mongoConnection = await connection();
  const articles = mongoConnection
    .then((db) => db.collection('articles').insertOne(articleDTO, { writeConcern: { w: 'majority', wtimeout: 500 } }));
  mongoConnection.then((db) => db.close());
  return articles;
};

const putManyArticles = async (arrayOfArticles) => {
  const mongoConnection = await connection();
  const articles = mongoConnection.then((db) => db.collection('articles').insertMany(arrayOfArticles));
  mongoConnection.then((db) => db.close());
  return articles;
};

const updateOneArticle = async (id, props) => {
  const mongoConnection = await connection();
  const articles = mongoConnection
    .then((db) => db.collection('articles').updateOne({ id }, { $set: { ...props } }, { upsert: true }))
    .then(() => ({ id }));
  mongoConnection.then((db) => db.close());
  return articles;
};

const deleteAllData = async () => {
  const mongoConnection = await connection();
  const articles = mongoConnection.then((db) => db.dropDatabase());
  mongoConnection.then((db) => db.close());
  return articles;
};

const deleteOneArticle = async (id) => {
  const article = await getOneArticle({ id });
  if (!article) return false;
  const mongoConnection = await connection();
  const articles = mongoConnection.then((db) => db.collection('articles').deleteOne({ id: article.id }));
  mongoConnection.then((db) => db.close());
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
  updateOneArticle,
  deleteAllData,
  deleteOneArticle,
};
