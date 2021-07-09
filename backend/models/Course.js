const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Lesson',
    },
  ],
  title: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
  },
  description: {
    type: String,
    required: true,
  },
  markDown: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  curriculum: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
})

module.exports = Course = mongoose.model('Course', courseSchema)
