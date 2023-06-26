const express = require('express');
const router = express.Router();
const incidents = require('../controllers/incidents')


router.get('/',incidents.GetTypeIncidents)
router.post('/CreateIncident',incidents.CreateIncident)
// router.post('/Create', linesFavorites.CreateLineFavorite)
module.exports = router