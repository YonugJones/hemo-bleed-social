const asyncHandler = require('express-async-handler')
const CustomError = require('../errors/customError')
const {
  createEventWithChild,
  updateEventWithChild,
  deleteEventWithChild,
} = require('../services/eventService')
const prisma = require('../prisma/prismaClient')

const createActivity = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const { name, durationInMinutes, isPhysicalTherapy, note } = req.body

  if (!name) throw new CustomError('name required', 400)
  if (!durationInMinutes)
    throw new CustomError('durationInMinutes required', 400)
  if (!isPhysicalTherapy)
    throw new CustomError('isPhysicalTherapy required', 400)

  const event = await createEventWithChild(userId, 'Activity', {
    name,
    durationInMinutes,
    isPhysicalTherapy,
    note,
  })

  res.status(201).json({
    success: true,
    message: 'Activity event created',
    data: event,
  })
})

const updateActivity = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const activityId = req.params.activityId
  const { name, durationInMinutes, isPhysicalTherapy, note } = req.body

  if (!name) throw new CustomError('name required', 400)
  if (!durationInMinutes)
    throw new CustomError('durationInMinutes required', 400)
  if (!isPhysicalTherapy)
    throw new CustomError('isPhysicalTherapy required', 400)

  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
  })
  if (!activity) throw new CustomError('Activity not found', 404)

  const eventId = activity.eventId

  const updatedEvent = await updateEventWithChild(userId, eventId, 'Activity', {
    name,
    durationInMinutes,
    isPhysicalTherapy,
    note,
  })

  res.status(200).json({
    success: true,
    message: 'Activity successfully udpated',
    data: updatedEvent,
  })
})

const deleteActivity = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const activityId = req.params.activityId

  const activity = await prisma.activity.findUnique({
    where: { id: activityId },
  })
  if (!activity) throw new CustomError('Activity not found', 404)
  const eventId = activity.eventId

  await deleteEventWithChild(userId, eventId)

  res
    .status(200)
    .json({ success: true, message: 'Activity successfully deleted' })
})

module.exports = {
  createActivity,
  updateActivity,
  deleteActivity,
}
