const express = require('express')
const { signup } = require('../controllers/auth')
const { validateSignup } = require('../middleware/validateInput')
const router = express.Router()
/*
/auth
*/
router.post('/signup', validateSignup, signup)

module.exports = router
