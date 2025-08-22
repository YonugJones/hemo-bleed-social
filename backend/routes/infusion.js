const express = require('express')
const infusionController = require('../controllers/infusion')
const authenticateToken = require('../middleware/auth')
const router = express.Router()

router.post('/', authenticateToken, infusionController.createInfusion)

module.exports = router
