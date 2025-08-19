const express = require('express')
const { signup, login } = require('../controllers/auth')
const { validateSignup } = require('../middleware/validateInput')
const router = express.Router()
/*
/auth
*/
router.post('/signup', validateSignup, signup)
router.post('/login', login)

module.exports = router
