const express = require('express');
const { mdwArticles } = require('../middlewares');

const articlesRouter = express.Router();

articlesRouter.get('/', mdwArticles.findArticlesBypage);

module.exports = articlesRouter;
