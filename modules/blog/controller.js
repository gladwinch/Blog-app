const ErrorResponse = require('../../utils/errorResponse')
const asyncHandler = require('../../middleware/async')
const Blog = require('./model')
const { upsplash } = require('../../utils')


// @desc      Create blog
// @route     POST /api/blog
// @access    Private
exports.create = asyncHandler(async (req, res, next) => {
    // Add user to req,body
    req.body.user = req.user.id;

    // get blog image
    const images = await upsplash(req.body.tags)
    console.log('images: ', images)
    req.body.smimage = images.smimage
    req.body.mdimage = images.mdimage
  
    // Create blog
    await Blog.create(req.body)
    const blogs = await Blog.find().populate('user', 'name').sort({ createdAt: -1 })
  
    res.status(200).json({
        success: true,
        data: blogs
    })
})

// @desc      Get single blog
// @route     GET /api/blog/:id
// @access    Public
exports.getsingle = asyncHandler(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);
  
    if (!blog) {
        return next(
            new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404)
        )
    }
  
    res.status(200).json({ success: true, data: blog });
})

// @desc      Get blogs
// @route     GET /api/blog
// @access    Public
exports.get = asyncHandler(async (req, res, next) => {
    const blog = await Blog.find().populate('user', 'name').sort({ createdAt: -1 })
    res.status(200).json({ success: true, data: blog });
})

// @desc      Edit blog
// @route     PUT /api/blog
// @access    Private
exports.update = asyncHandler(async (req, res, next) => {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(
            new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404)
        )
    }

    blog = await Blog.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({ success: true, data: blog })
})

// @desc      Delete blog
// @route     DELETE /api/blog/:id
// @access    Private
exports.deleteblog = asyncHandler(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)
  
    if (!blog) {
        return next(
            new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404)
        )
    }
  
    await blog.remove()
    const blogs = await Blog.find().populate('user', 'name').sort({ createdAt: -1 })

    res.status(200).json({ success: true, data: blogs })
})

// helper fn
function getImage(tag) {

} 