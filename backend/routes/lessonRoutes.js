const express = require('express')
const router = express.Router()

// Middleware

const { protect, admin } = require('../middleware/authMiddleware.js')

// Controllers

const {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
} = require('../controllers/lessonControllers')

// Routes

router.route('/').post(protect, admin, createLesson).get(getAllLessons)
router
  .route('/:id')
  .get(getLessonById)
  .put(protect, admin, updateLesson)
  .delete(protect, admin, deleteLesson)

module.exports = router
