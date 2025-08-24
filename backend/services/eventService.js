require('dotenv').config()
const prisma = require('../prisma/prismaClient')
const asyncHandler = require('express-async-handler')
const CustomError = require('../errors/customError')

/**
 * Helper to create a new Event + related sub-record (Bleed, Infusion, Activity).
 * @param {string} userId - ID of the user creating the event
 * @param {string} type - EventType ("Bleed" | "Infusion" | "Activity")
 * @param {object} data - Specific data for the child record
 * @returns {Promise<object>} - Created event with relation included
 */

const createEventWithChild = asyncHandler(async (userId, type, data) => {
  if (!userId || !type)
    throw new CustomError('User ID and type are required', 400)

  let eventData = {
    type,
    userId,
  }

  // Prisma create shape differs by event type
  switch (type) {
    case 'Bleed':
      eventData = {
        ...eventData,
        bleed: { create: data },
      }
      break
    case 'Infusion':
      eventData = {
        ...eventData,
        infusion: { create: data },
      }
      break
    case 'Activity':
      eventData = {
        ...eventData,
        activity: { create: data },
      }
      break
    default:
      throw new CustomError(`Invalid event type: ${type}`, 400)
  }

  // Create event + child record in one transaction
  const event = await prisma.event.create({
    data: eventData,
    include: {
      bleed: true,
      infusion: true,
      activity: true,
    },
  })

  return event
})

/**
 * Helper to update an Event + related sub-record (Bleed, Infusion, Activity).
 * @param {string} userId - ID of the user editing the event
 * @param {string} eventId - ID of the event to update
 * @param {string} type - EventType ("Bleed" | "Infusion" | "Activity")
 * @param {object} data - Updated child data
 * @returns {Promise<object>} - Updated event with child
 */
const updateEventWithChild = asyncHandler(
  async (userId, eventId, type, data) => {
    if (!userId || !eventId || !type)
      throw new CustomError('Missing required parameters', 400)

    // fetch existing event
    const event = await prisma.event.findUnique({ where: { id: eventId } })
    if (!event) throw new CustomError('Event not found', 404)
    if (event.userId !== userId) throw new CustomError('Unauthorized', 403)

    // build child update object
    let childUpdate = {}
    switch (type) {
      case 'Bleed':
        childUpdate = { bleed: { update: data } }
        break
      case 'Infusion':
        childUpdate = { infusion: { update: data } }
        break
      case 'Activity':
        childUpdate = { activity: { update: data } }
        break
      default:
        throw new CustomError(`Invalid event type: ${type}`, 400)
    }

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: childUpdate,
      include: {
        bleed: true,
        infusion: true,
        activity: true,
      },
    })

    return updatedEvent
  }
)

/**
 * Helper to delete an event + related sub-record (Bleed, Infusion, Activity).
 * @param {string} userId - ID of the user creating the event
 * @param {string} eventId - ID of the event to delete
 * @returns {Promise<object>} - Deletes event with relation included and returns success + message
 */
const deleteEventWithChild = asyncHandler(async (userId, eventId) => {
  if (!eventId) throw new CustomError('EventId is required', 400)

  // ensure user owns the event
  const event = await prisma.event.findUnique({ where: { id: eventId } })
  if (!event) throw new CustomError('Event not found', 404)
  if (event.userId !== userId) throw new CustomError('Unauthorized', 403)

  await prisma.event.delete({ where: { id: eventId } })

  return { success: true, message: 'Event deleted successfully' }
})

/**
 * Get all events for a given user, ordered by createdAt desc
 */
const getUserEvents = asyncHandler(async (userId) => {
  if (!userId) throw new CustomError('User ID is required', 400)

  const whereClause = { userId }
  if (type) {
    whereClause.type = type
  }

  return await prisma.event.findMany({
    where: whereClause,
    include: {
      bleed: true,
      infusion: true,
      activity: true,
    },
    orderBy: { createdAt: 'desc' },
  })
})

module.exports = {
  createEventWithChild,
  updateEventWithChild,
  deleteEventWithChild,
  getUserEvents,
}
