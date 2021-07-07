const express = require('express')
const router = express.Router()

// Middleware

const { protect, admin } = require('../middleware/authMiddleware.js')

// Controllers

const {
  createLesson,
  getAllLessons,
  getLessonById,
} = require('../controllers/lessonControllers')

// Routes

router.route('/').post(protect, admin, createLesson).get(getAllLessons)
router.route('/:id').get(getLessonById)

module.exports = router
