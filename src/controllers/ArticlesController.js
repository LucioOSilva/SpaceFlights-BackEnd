const express = require('express');
const { mdwArticles } = require('../middlewares');

const articlesRouter = express.Router();

articlesRouter.get('/', mdwArticles.findArticlesBypage);
articlesRouter.get('/:id', mdwArticles.findArticleById);
articlesRouter.post('/', mdwArticles.postOneArticle);

module.exports = articlesRouter;
