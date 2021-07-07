const asyncHandler = require('express-async-handler')

// Models
const Course = require('../models/Course')

// desc         Create course entry
// @route       POST /api/course
// @access      Private / Admin

const createCourse = asyncHandler(async (req, res) => {
  const course = new Course({
    title: 'Sample Title',
    language: 'Javascript',
    curriculum: 'Sample Curriculum',
    lessons: [''],
    availability: 'true',
  })

  const createdCourse = await course.save()

  res.status(201).json(createdCourse)
})

// desc         Get all courses
// @route       GET /api/course
// @access      Public

const getAllCourses = asyncHandler(async (req, res) => {
  const blogs = await blogs.find()

  res.json(blogs)
})

// desc         Fetch single course
// @route       GET /api/course/:id
// @access      Public

const getCourseById = asyncHandler(async (req, res) => {
  const course = await course.findById(req.params.id)

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
    blog.title = title
    blog.language = language
    blog.curriculum = curriculum
    blog.lessons = lessons
    blog.availability = availability
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