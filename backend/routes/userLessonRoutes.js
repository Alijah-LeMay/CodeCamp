const express = require('express')
const router = express.Router()

// Middleware

const { protect, admin } = require('../middleware/authMiddleware.js')

// Controllers

const {
  createUserLesson,
  getAllUserLessons,
  getUserLessonById,
  updateUserLesson,
} = require('../controllers/userLessonControllers')

// Routes

router
  .route('/')
  .post(protect, createUserLesson)
  .get(protect, getAllUserLessons)

router.route('/:id').get(getUserLessonById).put(protect, updateUserLesson)

module.exports = router
