const User = require('../models/user')
const catchAsyncError =  require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler')
const jwt = require('jsonwebtoken');
// check if user is authenticated 
exports.isAuthenticatedUser = catchAsyncError( async (req, res, next)=>{

    const {token} = req.cookies

    // console.log(token)

    if(!token) {
        return next(new ErrorHandler('Login first to access this resoure '), 401);

    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded._id);
    // req.user = await User.findById(decoded.id);
    // console.log('decoded._id : ' + decoded._id)
    
    next()

})