const express = require('express')
const {
    register,
    login,
    logout,
    getuser
} = require('./controller')

const router = express.Router();
const { protect } = require('../../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/user', protect, getuser)

module.exports = router;