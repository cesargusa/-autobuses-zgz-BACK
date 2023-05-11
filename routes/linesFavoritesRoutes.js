const express = require('express');
const router = express.Router();
const linesFavorites = require('../controllers/linesFavorites')


router.get('/:idUser',linesFavorites.GetLinesFavorites)
router.post('/Create', linesFavorites.CreateLineFavorite)
module.exports = router