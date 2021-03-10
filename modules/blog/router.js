const express = require('express')
const {
    getsingle,
    get,
    create,
    update,
    deleteblog 
} = require('./controller')
const router = express.Router()
const { protect } = require('../../middleware/auth')

router
    .route('/')
    .get(get)
    .post(protect, create)

router
    .route('/:id')
    .get(getsingle)
    .put(protect, update)
    .delete(protect, deleteblog)

module.exports = router