const ErrorResponse = require('../../utils/errorResponse')
const asyncHandler = require('../../middleware/async')
const User = require('./model')

// @desc      Register user
// @route     POST /api/user/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body
  
    // Create user
    const user = await User.create({
        name,
        email,
        password
    })
  
    sendTokenResponse(user, 200, res)
})

// @desc      Login user
// @route     POST /api/user/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    // Validate emil & password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    sendTokenResponse(user, 200, res)
})

// @desc      Log user out / clear cookie
// @route     GET /api/user/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })

    res.cookie('authorize', 'null', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: false
    })
  
    res.status(200).json({
        success: true,
        data: {}
    })
})

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getuser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)
  
    res.status(200).json({
        success: true,
        data: user
    })
})

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, response) => {
    // Create token
    const token = user.getSignedJwtToken()
  
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    const option_auth = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: false
    }
  
    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    delete user.password
  
    response
        .status(statusCode)
        .cookie('token', token, options)
        .cookie('authorize', 'user-authorize', option_auth)
        .json({
            success: true,
            token,
            data: user
        })
}