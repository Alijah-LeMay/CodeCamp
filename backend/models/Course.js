const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Lesson',
  },
  title: {
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
  // lessons: [
  //   {
  //     title: { type: String, required: true },
  //     description: { type: String, required: true },
  //     markdown: { type: String, required: true },
  //     initialCode: { type: String, required: true },
  //     matchCode: { type: String, required: true },
  //     index: { type: Number, required: true },
  //     max: { type: Number, required: true },
  //   },
  // ],
  availability: {
    type: String,
    required: true,
  },
})

module.exports = Course = mongoose.model('Course', courseSchema)
