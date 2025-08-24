const express = require('express')
const activityController = require('../controllers/activity')
const authenticateToken = require('../middleware/auth')
const router = express.Router()

router.post('/', authenticateToken, activityController.createActivity)
router.put('/:activityId', authenticateToken, activityController.updateActivity)
router.delete(
  '/:activityId',
  authenticateToken,
  activityController.deleteActivity
)

module.exports = router
