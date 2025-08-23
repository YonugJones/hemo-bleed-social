const asyncHandler = require('express-async-handler')
const CustomError = require('../errors/customError')
const {
  createEventWithChild,
  updateEventWithChild,
  deleteEventWithChild,
} = require('../services/eventService')
const prisma = require('../prisma/prismaClient')

const createBleed = asyncHandler(async (req, res) => {
  const userId = req.body.userId
  const { location, severity, note } = req.body

  if (!location) throw new CustomError('Bleed location required', 400)
  if (!severity) throw new CustomError('Bleed severity required', 400)

  const event = await createEventWithChild(userId, 'Bleed', {
    location,
    severity,
    note,
  })

  res.status(201).json({
    success: true,
    message: 'Bleed logged successfully',
    data: event,
  })
})

module.exports = {
  createBleed,
}
