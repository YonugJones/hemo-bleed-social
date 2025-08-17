require('dotenv').config()
const prisma = require('../prisma/prismaClient')
const asyncHandler = require('express-async-handler')
const CustomError = require('../errors/customError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  )
}

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  )
}

const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    throw new CustomError('All fields are required', 400)
  }

  const usernameExists = await prisma.user.findUnique({ where: { username } })
  if (usernameExists) {
    throw new CustomError('Username is taken', 409)
  }

  const emailExists = await prisma.user.findUnique({ where: { email } })
  if (emailExists) {
    throw new CustomError('Email is taken', 409)
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  })

  res.status(201).json({
    success: true,
    message: 'New user created',
    data: {
      id: newUser.id,
      username: newUser.username,
    },
  })
})

module.exports = { signup }
