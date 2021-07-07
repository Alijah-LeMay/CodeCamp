const asyncHandler = require('express-async-handler')

// Models
const Course = require('../models/Course')

// desc         Create course entry
// @route       POST /api/course
// @access      Private / Admin

const createCourse = asyncHandler(async (req, res) => {
  const course = new Course({
    lesson: '60e62be32fd31c5e9c658f46',
    title: 'Sample Title',
    language: 'Javascript',
    curriculum: 'Sample Curriculum',
    // lessons: ['60e62be32fd31c5e9c658f46'],
    availability: 'true',
  })

  const createdCourse = await course.save()

  res.status(201).json(createdCourse)
})

// desc         Get all courses
// @route       GET /api/course
// @access      Public

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find()

  res.json(courses)
})

// desc         Fetch single course
// @route       GET /api/course/:id
// @access      Public

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    res.json(course)
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

// desc         Delete single course
// @route       DELETE /api/course/:id
// @access      Private / Admin

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
  if (course) {
    await course.remove()
    res.json({ message: 'Course Removed' })
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

// @desc        Update course
// @route       PUT /api/course/:id
// @access      Private / Admin

const updateCourse = asyncHandler(async (req, res) => {
  const { title, language, curriculum, lessons, availability } = req.body

  const course = await Course.findById(req.params.id)

  if (course) {
    course.title = title
    course.language = language
    course.curriculum = curriculum
    course.lessons = lessons
    course.availability = availability
  }

  const updatedCourse = await course.save()
  res.status(201).json(updatedCourse)
})

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  deleteCourse,
  updateCourse,
}
