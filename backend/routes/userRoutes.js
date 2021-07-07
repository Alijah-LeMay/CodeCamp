const express = require('express')
const router = express.Router()

// Middleware

const { protect, admin } = require('../middleware/authMiddleware')

// Controllers

const {
  loginUser,
  getAllUsers,
  registerUser,
  registerAdminUser,
  deleteUser,
} = require('../controllers/userController')

// Routes

router.route('/').post(registerUser).get(getAllUsers)
router.route('/admin').post(protect, admin, registerAdminUser)
router.post('/login', loginUser)
router.route('/:id').delete(protect, admin, deleteUser)

module.exports = router
