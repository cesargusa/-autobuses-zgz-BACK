const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/', userController.GetUsers);
router.get('/:idUser', userController.GetUserById)
router.post('/CreateUser', userController.CreateUser);
// router.delete('/DeleteUser/:idUser', userController.DeleteUser)
router.put('/UpdateUser/:idUser', userController.UpdateUser)
router.put('/UpdateUserPassword/:idUser',userController.UpdatePasswordUser)
router.post('/Login', userController.Login)
router.put('/DeleteUser/:idUser', userController.DeleteUserIsActive)
module.exports = router;
