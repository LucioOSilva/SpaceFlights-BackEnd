const express = require('express');
const { mdwArticles } = require('../middlewares');

const articlesRouter = express.Router();

articlesRouter.get('/', mdwArticles.findArticlesBypage);
articlesRouter.get('/:id', mdwArticles.findArticleById);
articlesRouter.post('/', mdwArticles.postOneArticle);
articlesRouter.put('/:id', mdwArticles.updateOneArticle);
articlesRouter.delete('/:id', mdwArticles.removeOneArticle);

module.exports = articlesRouter;
