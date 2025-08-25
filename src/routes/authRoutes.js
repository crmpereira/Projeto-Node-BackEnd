const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin } = require('../middleware/validation');

router.post('/login', validateLogin, authController.login);

module.exports = router;
