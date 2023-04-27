const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/', userController.GetUsers);
router.post('/CreateUser', userController.CreateUser);
router.delete('/DeleteUser/:idUser', userController.DeleteUser)

module.exports = router;
