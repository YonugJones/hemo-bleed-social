const asyncHandler = require('express-async-handler')
const CustomError = require('../errors/customError')
const {
  createEventWithChild,
  updateEventWithChild,
  deleteEventWithChild,
} = require('../services/eventService')
const prisma = require('../prisma/prismaClient')

const createBleed = asyncHandler(async (req, res) => {
  const userId = req.user.id
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

const updateBleed = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const bleedId = req.params.bleedId
  const { location, severity, note } = req.body

  if (!location) throw new CustomError('Bleed location required', 400)
  if (!severity) throw new CustomError('Bleed severity required', 400)

  const bleed = await prisma.bleed.findUnique({ where: { id: bleedId } })
  if (!bleed) throw new CustomError('Bleed not found', 404)
  const eventId = bleed.eventId

  const updatedEvent = await updateEventWithChild(userId, eventId, 'Bleed', {
    location,
    severity,
    note,
  })

  res.status(200).json({
    success: true,
    message: 'Bleed successfully udpated',
    data: updatedEvent,
  })
})

module.exports = {
  createBleed,
  updateBleed,
}
