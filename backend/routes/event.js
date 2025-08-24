const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middleware/authMiddleware')
const { getEvents } = require('../controllers/eventController')

router.get('/', authenticateToken, getEvents)

module.exports = router
