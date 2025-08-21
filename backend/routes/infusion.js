const express = require('express')
const { createInfusion } = require('../controllers/infusion')
const router = express.Router()

router.post('/', createInfusion)

module.exports = router
