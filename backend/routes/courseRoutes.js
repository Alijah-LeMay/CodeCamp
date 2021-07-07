const express = require('express')
const router = express.Router()

// Middleware

const { protect, admin } = require('../middleware/authMiddleware.js')

// Controllers

const {
  createCourse,
  getAllCourses,
  getCourseById,
  deleteCourse,
  updateCourse,
} = require('../controllers/courseController')

// Routes

router.route('/').post(protect, admin, createCourse).get(getAllCourses)
router
  .route('/:id')
  .get(getCourseById)
  .delete(protect, admin, deleteCourse)
  .put(protect, admin, updateCourse)

module.exports = router
