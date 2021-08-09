const asyncHandler = require('express-async-handler')

// Models
const UserLesson = require('../models/UserLesson')

// desc         Create a users lesson entry
// @route       POST /api/userLesson
// @access      Private

const createUserLesson = asyncHandler(async (req, res) => {
  const { lesson } = req.body

  const userLesson = new UserLesson({
    user: req.user._id,
    authorLesson: lesson,
    completed: false,
    initialCode: 'Sample code',
  })

  const createdUserLesson = await userLesson.save()
  res.status(201).json(createdUserLesson)
})

// desc         Get all lessons
// @route       GET /api/userLesson
// @access      Private

const getAllUserLessons = asyncHandler(async (req, res) => {
  const user = req.user._id

  const lessons = await UserLesson.find({ user: user })

  res.json(lessons)
})

// desc         Fetch single lesson
// @route       GET /api/userLesson/:id
// @access      Private

const getUserLessonById = asyncHandler(async (req, res) => {
  const user = req.user._id
  const parent = req.params.id
  const lesson = await UserLesson.findOne({ user: user, authorLesson: parent })

  if (lesson) {
    res.json(lesson)
  } else {
    res.status(404)
    throw new Error('Lesson not found')
  }
})
// const getUserLessonById = asyncHandler(async (req, res) => {
//   const lesson = await UserLesson.findById(req.params.id)

//   if (lesson) {
//     res.json(lesson)
//   } else {
//     res.status(404)
//     throw new Error('Lesson not found')
//   }
// })

// @desc        Update USER lesson
// @route       PUT /api/userLesson/:id
// @access      Private

const updateUserLesson = asyncHandler(async (req, res) => {
  const { completed, initialCode, authorLesson } = req.body
  const user = req.user._id
  const id = req.params.id

  const lesson = await UserLesson.findOne({ authorLesson: id, user: user })

  if (lesson) {
    lesson.completed = completed
    lesson.initialCode = initialCode
    lesson.authorLesson = authorLesson
    lesson.user = user
  }

  const updatedLesson = await lesson.save()
  res.status(201).json(updatedLesson)
})

module.exports = {
  createUserLesson,
  getUserLessonById,
  getAllUserLessons,
  updateUserLesson,
}
