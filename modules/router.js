const express = require('express')
const router = express.Router()

router.use('/user', require('./user/router'))
router.use('/blog', require('./blog/router'))

module.exports = router