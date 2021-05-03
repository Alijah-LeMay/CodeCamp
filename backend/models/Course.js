const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
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
  lessons: {
    type: Array,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
})
