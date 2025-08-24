const asyncHandler = require('express-async-handler')
const { getUserEvents } = require('../services/eventService')

const getEvents = asyncHandler(async (req, res) => {
  const userId = req.user.userId
  const { type } = req.query
  const events = await getUserEvents(userId, type)

  res.status(200).json({
    success: true,
    message: 'User events fetched',
    data: events,
  })
})

module.exports = {
  getEvents,
}
