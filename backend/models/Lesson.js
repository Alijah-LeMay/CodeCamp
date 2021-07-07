const mongoose = require('mongoose')

const lessonSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  title: { type: String, required: true },
  description: { type: String, required: true },
  markdown: { type: String, required: true },
  initialCode: { type: String, required: true },
  matchCode: { type: String, required: true },
  index: { type: Number, required: true },
  max: { type: Number, required: true },
})

module.exports = Lesson = mongoose.model('Lesson', lessonSchema)
