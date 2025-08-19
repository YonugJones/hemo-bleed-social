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
  // find username, email, and password in req's body
  const { username, email, password } = req.body

  // if any missing fields, throw error
  if (!username || !email || !password)
    throw new CustomError('All fields are required', 400)

  // make sure new username is not already taken
  const usernameExists = await prisma.user.findUnique({ where: { username } })
  if (usernameExists) throw new CustomError('Username is taken', 409)

  // make sure new email is not already taken
  const emailExists = await prisma.user.findUnique({ where: { email } })
  if (emailExists) throw new CustomError('Email is taken', 409)

  // create hashed password with bcrypt
  const hashedPassword = await bcrypt.hash(password, 10)

  // create newUser in db
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  })

  // response
  res.status(201).json({
    success: true,
    message: 'New user created',
    data: {
      id: newUser.id,
      username: newUser.username,
    },
  })
})

const login = asyncHandler(async (req, res) => {
  // find username and password in request body
  const { username, password } = req.body
  if (!username || !password)
    throw new CustomError('Username and password are required', 400)

  //find user in database using entered username
  const user = await prisma.user.findUnique({ where: { username } })
  if (!user) throw new CustomError('Invalid username or password')

  // compare the user's hashed password with the entered password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new CustomError('Invalid username or password')

  // generate tokens after credential check
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  // update the user with the refreshToken item
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  })

  // set the refreshToken in the cookie with credentials
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  // send success status with message and user login data
  res.status(201).json({
    success: true,
    message: 'User successfully logged in',
    accessToken,
    data: {
      id: user.id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    },
  })
})

const refresh = asyncHandler(async (req, res) => {
  // look for refresh token attached to the request
  const token = req.cookies.refreshToken
  if (!token) throw new CustomError('Refresh token required', 403)

  //
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) throw new CustomError('Invalid refresh token', 403)

    // find the user by matching the id of the validated token on request with user db
    const user = await prisma.user.findUnique({
      where: { id: decoded.id, refreshToken: token },
    })
    if (!user) throw new CustomError('Refresh token not found', 403)

    const newAccessToken = generateAccessToken(user)
    res.status(200).json({ accessToken: newAccessToken })
  })
})

const logout = asyncHandler(async (req, res) => {
  // find the refresh token attached to the request's cookies
  const { refreshToken } = req.cookies
  // if there is none, no action needed
  if (!refreshToken) return res.status(204).json({ message: 'No content' })

  // find the user in the database by matching the refreshToken attached to cookies to the rT in db
  const user = await prisma.user.findFirst({ where: { refreshToken } })
  if (!user) {
    res.clearCookie('refreshToken')
    res.status(204).json({ message: 'No content' })
  }

  // clear the refreshToken in the user database
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: null },
  })

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  })
})

module.exports = {
  signup,
  login,
  refresh,
  logout,
}
