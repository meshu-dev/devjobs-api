let express = require('express'),
  router = express.Router(),
  UserController = require('./../controllers/UserController'),
  userController = new UserController(require('./../models/UserModel'));

router.post('/', userController.add.bind(userController));
router.get('/:id', userController.get.bind(userController));
router.get('/', userController.getAll.bind(userController));
router.put('/:id', userController.edit.bind(userController));
router.delete('/:id', userController.delete.bind(userController));

module.exports = router;
