const express = require('express')
const infusionController = require('../controllers/infusion')
const authenticateToken = require('../middleware/auth')
const router = express.Router()

router.post('/', authenticateToken, infusionController.createInfusion)
router.put('/:infusionId', authenticateToken, infusionController.updateInfusion)
router.delete(
  '/:infusionId',
  authenticateToken,
  infusionController.deleteInfusion
)

module.exports = router
