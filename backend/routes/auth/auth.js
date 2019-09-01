const router = require('express').Router();
const authController = require('../../controllers/auth/auth');
//  http://localhost:3200/api/auth/login
router.post('/login', authController.login);

//  http://localhost:3200/api/auth/signup
router.post('/signup', authController.signup);

module.exports = router;