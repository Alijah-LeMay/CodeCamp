const path = require('path')
const express = require('express')
const multer = require('multer')

const router = express.Router()
// When uploading to digitalOcean with Ubuntu and Nginx reverse Proxy, uploads route gets messed around.
const storage = multer.diskStorage({
  destination(req, file, cb) {
    process.env.NODE_ENV === 'production'
      ? cb(null, '../uploads/')
      : cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  try {
    res.status(201).send(`/${req.file.path}`)
  } catch (error) {
    console.error(error)
    console.log('tried uploading')
  }
})

module.exports = router
