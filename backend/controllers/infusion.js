const asyncHandler = require('express-async-handler')
const CustomError = require('../errors/customError')
const {
  createEventWithChild,
  updateEventWithChild,
} = require('../services/eventService')
// const prisma = require('../prisma/prismaClient')

const createInfusion = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const { medicine, dosage, location, lotNumbers, reasons, note } = req.body

  if (!medicine) throw new CustomError('Medicine required', 400)
  if (!dosage) throw new CustomError('Dosage required', 400)

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

const updateInfusion = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const infusionId = req.params.id
  const { medicine, dosage, location, lotNumbers, reasons, note } = req.body
  if (!medicine) throw new CustomError('Medicine field required', 403)
  if (!dosage) throw new CustomError('Dosage field required', 403)

  const updatedEvent = await updateEventWithChild(
    userId,
    infusionId,
    'Infusion',
    {
      medicine,
      dosage,
      location,
      lotNumbers,
      reasons,
      note,
    }
  )

  res.status(200).json({
    success: true,
    message: 'Infusion updated',
    data: updatedEvent,
  })
})

module.exports = {
  createInfusion,
  updateInfusion,
}
