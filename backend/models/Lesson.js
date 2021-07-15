const mongoose = require('mongoose')

const lessonSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  title: { type: String, required: true },
  language: { type: String, required: true },
  description: { type: String, required: true },
  markDown: { type: String, required: true },
  initialCode: { type: String, required: true },
  matchCode: { type: String, required: true },
  index: { type: Number, required: true },
  max: { type: Number, required: true },
  completed: { type: Boolean, required: false },
})

module.exports = Lesson = mongoose.model('Lesson', lessonSchema)
