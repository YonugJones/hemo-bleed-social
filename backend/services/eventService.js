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
 * Get all events for a given user, ordered by createdAt desc
 */
const getUserEvents = asyncHandler(async (userId) => {
  if (!userId) throw new CustomError('User ID is required', 400)

  return await prisma.event.findMany({
    where: { userId },
    include: {
      bleed: true,
      infusion: true,
      activity: true,
    },
    orderBy: { createdAt: 'desc' },
  })
})

/**
 * Delete an event (and its child) by ID
 */
const deleteEvent = asyncHandler(async (eventId, userId) => {
  if (!eventId) throw new CustomError('EventId is required', 400)

  // ensure user owns the event
  const event = await prisma.event.findUnique({ where: { id: eventId } })
  if (!event) throw new CustomError('Event not found', 404)
  if (event.userId !== userId) throw new CustomError('Unauthorized', 403)

  await prisma.event.delete({ where: { id: eventId } })

  return { success: true, message: 'Event deleted successfully' }
})

module.exports = {
  createEventWithChild,
  getUserEvents,
  deleteEvent,
}
