const asyncHandler = require('express-async-handler')

// Models
const Lesson = require('../models/Lesson')

// desc         Create lesson entry
// @route       POST /api/lesson
// @access      Private / Admin

const createLesson = asyncHandler(async (req, res) => {
  const lesson = new Lesson({
    user: req.user._id,
    title: 'Sample name',
    description: 'Sample Description',
    markDown: 'Sample Markdown',
    initialCode: 'Sample code',
    matchCode: 'Sample code',
    index: 0,
    max: 10,
  })

  const createdLesson = await lesson.save()
  res.status(201).json(createdLesson)
})

// desc         Get all lessons
// @route       GET /api/lesson
// @access      Public

const getAllLessons = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find()

  res.json(lessons)
})

// desc         Fetch single lesson
// @route       GET /api/course/:id
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

// @desc        Update lesson
// @route       PUT /api/lesson/:id
// @access      Private / Admin

const updateLesson = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    markDown,
    initialCode,
    matchCode,
    index,
    max,
    user,
  } = req.body

  const lesson = await Lesson.findById(req.params.id)

  if (lesson) {
    lesson.title = title
    lesson.description = description
    lesson.markDown = markDown
    lesson.initialCode = initialCode
    lesson.matchCode = matchCode
    lesson.index = index
    lesson.max = max
    lesson.user = user
  }

  const updatedLesson = await lesson.save()
  res.status(201).json(updatedLesson)
})

// desc         Delete single lesson
// @route       DELETE /api/lesson/:id
// @access      Private / Admin

const deleteLesson = asyncHandler(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id)
  if (lesson) {
    await lesson.remove()
    res.json({ message: 'Lesson Removed' })
  } else {
    res.status(404)
    throw new Error('Lesson not found')
  }
})

module.exports = {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
}
