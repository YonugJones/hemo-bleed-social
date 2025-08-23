const express = require('express')
const bleedController = require('../controllers/bleed')
const authenticateToken = require('../middleware/auth')
const router = express.Router()

router.post('/', authenticateToken, bleedController.createBleed)

module.exports = router
