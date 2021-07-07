const asyncHandler = require('express-async-handler')

// Models
const Lesson = require('../models/Lesson')

// desc         Create lesson entry
// @route       POST /api/course/lesson
// @access      Private / Admin

const createLesson = asyncHandler(async (req, res) => {
  const lesson = new Lesson({
    user: req.user._id,
    title: 'Sample name',
    description: 'Sample Description',
    markdown: 'Sample Markdown',
    initialCode: 'Sample code',
    matchCode: 'Sample code',
    index: 0,
    max: 10,
  })

  const createdLesson = await lesson.save()
  res.status(201).json(createdLesson)
})

// desc         Get all lessons
// @route       GET /api/course/lesson
// @access      Public

const getAllLessons = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find()

  res.json(lessons)
})

// desc         Fetch single lesson
// @route       GET /api/course/lesson/:id
// @access      Public

const getLessonById = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id)

  if (lesson) {
    res.json(lesson)
  } else {
    res.status(404)
    throw new Error('Lesson not found')
  }
})

module.exports = { createLesson, getAllLessons, getLessonById }
