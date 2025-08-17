const { body, validationResult } = require('express-validator')

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }
  next()
}

const validateSignup = [
  body('username')
    .notEmpty()
    .withMessage('Username field cannot be blank')
    .isLength({ min: 3, max: 24 })
    .withMessage('Username must be between 3 and 24 characters long')
    .matches(/^\S+$/)
    .withMessage('Username may not contain spaces'),
  body('email')
    .notEmpty()
    .withMessage('Email field cannot be blank')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 10 })
    .withMessage('Password must be at least 10 characters')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/)
    .withMessage('Password must contain at least one special character'),
  body('confirmPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords must match'),
  handleValidationErrors,
]

module.exports = {
  validateSignup,
}
