const express = require('express');
const ArticlesController = require('../controllers/ArticlesController');
const BaseController = require('../controllers/BaseController');

const router = express.Router();

router.use('/', BaseController);
router.use('/articles', ArticlesController);

module.exports = router;
