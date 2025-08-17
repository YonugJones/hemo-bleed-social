require('dotenv').config()
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const CustomError = require('../errors/customError')

const authenticateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError('Unauthorized. No token provided')
  }

  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new CustomError('Server error. ACCESS_TOKEN_SECRET not defined', 500)
  }

  const token = authHeader.split(' ')[1]

  try {
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new CustomError('Unauthorized. Token has expired')
    } else {
      throw new CustomError('Unauthorized. Invalid token')
    }
  }
})

module.exports = authenticateToken
