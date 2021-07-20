const mongoose = require('mongoose')

const userLessonSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  authorLesson: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Lesson',
  },
  completed: { type: Boolean, required: true, default: true },
  initialCode: { type: String, required: true, default: 'Sample code' },
})

module.exports = UserLesson = mongoose.model('UserLesson', userLessonSchema)
