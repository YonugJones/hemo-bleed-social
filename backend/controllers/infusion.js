const asyncHandler = require('express-async-handler')
const CustomError = require('../errors/customError')
const { createEventWithChild } = require('../services/eventService')

const createInfusion = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const { medicine, dosage, location, lotNumbers, reasons, note } = req.body

  if (!medicine || !dosage)
    throw new CustomError('Medicine and dosage required', 400)

  const event = await createEventWithChild(userId, 'Infusion', {
    medicine,
    dosage,
    location,
    lotNumbers,
    reasons,
    note,
  })

  res.status(201).json({
    success: true,
    message: 'Infusion logged successfully',
    data: event,
  })
})

module.exports = {
  createInfusion,
}
