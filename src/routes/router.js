const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.use('/login', LoginController);

module.exports = router;
