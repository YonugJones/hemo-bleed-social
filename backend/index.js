require('dotenv').config()
const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth')
const infusionRouter = require('./routes/infusion')
const bleedRouter = require('./routes/bleed')
const activityRouter = require('./routes/activity')

const app = express()

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// Built in Middleware for JSON
app.use(express.json())

// Built in Middleware to Handle Urlencoded Form Data
app.use(express.urlencoded({ extended: true }))

// middleware for cookies
app.use(cookieParser())

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend API' })
})

app.use('/auth', authRouter)
app.use('/events/infusion', infusionRouter)
app.use('/events/bleed', bleedRouter)
app.use('/events/activity', activityRouter)

// Global Error Handler
app.use(errorHandler)

const port = process.env.PORT || 3333
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
)
