const express = require('express')
require('dotenv').config()

const connectDB = require('./config/db')
const path = require('path')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const userRoutes = require('./routes/userRoutes')
const courseRoutes = require('./routes/courseRoutes')
const lessonRoutes = require('./routes/lessonRoutes')
const userLessonRoutes = require('./routes/userLessonRoutes')

const app = express()

// Connect Database
connectDB()

// Init Middleware
// No longer body-parser
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API Running'))

// Define Routes
app.use('/api/user', userRoutes)
app.use('/api/course', courseRoutes)
app.use('/api/lesson', lessonRoutes)
app.use('/api/userLesson', userLessonRoutes)
// Not Ready for email, .env
// app.use('/api/send', require('./routes/sendEmail'))

// Image upload route
app.use('/api/upload', require('./routes/upload'))
// Make uploads folder static
const dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use('/uploads', express.static(path.join(dirname, '../uploads/')))
} else {
  app.use('/uploads', express.static(path.join(dirname, '/uploads/')))
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, '/frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

//
// Make sure middleware is after all other routes
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5004

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
