let express = require('express'),
  router = express.Router(),
  AuthController = require('./../controllers/AuthController'),
  authController = new AuthController(require('./../models/UserModel'));

router.post('/login', authController.login.bind(authController));
router.post('/register', authController.register.bind(authController));

module.exports = router;
