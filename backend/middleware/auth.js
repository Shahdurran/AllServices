const SP = require('../models/serviceProvider')
const User = require('../models/user')
const Order = require('../models/order')
const catchAsyncError = require('./catchAsyncError');
const ErrorHandler = require('../utils/errorHandler')
const jwt = require('jsonwebtoken');
// check if user is authenticated 






exports.isAuthenticatedSP = catchAsyncError(async (req, res, next) => {

    const {
        sp_token
    } = req.cookies

    // console.log(token)

    if (!sp_token) {
        return next(new ErrorHandler('Login first to access this resoure '), 401);

    }
    const decoded = jwt.verify(sp_token, process.env.JWT_SECRET)
    req.sp = await SP.findById(decoded._id);
    // req.user = await User.findById(decoded.id);
    // console.log('decoded._id : ' + decoded._id)

    next()

})
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    const {
        token
    } = req.cookies

    // console.log(token)

    if (!token) {
        return next(new ErrorHandler('Login first to access this resoure '), 401);

    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded._id);
    userID = decoded._id;
    // req.user = await User.findById(decoded.id);
    // console.log('decoded._id : ' + decoded._id)
    // return
    next()

});


exports.isAvailable = catchAsyncError(async (req, res, next) => {

    // const buyer = req.user._id
    // const order = await Order.findOne(buyer)
    // console.log(order.bookingStatus)

    // if (!buyer) {
    //     return next(new ErrorHandler('User id not found'),404);
    // }
    // if (!order) {
    //     return next(new ErrorHandler('order not found', 401));
    // }

    // if (order.bookingStatus === 'Processing') {
    //     console.log('requested service provider in busy at the moment')
    //     return next(new ErrorHandler('service provider in busy at the moment', 401));
    // }
    // if (order.bookingStatus === 'Completed') {
    //     next();
    // }

return;


})


exports.isAuthenticatedAdmin = catchAsyncError(async function(req, res, next){

    const admin =  req.cookies //cookie of currently logged in user

    if(!token)
    {
        return next(new ErrorHandler('Login Please'));
    }

    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);

    console.log('decoded._id : ' + decoded._id)
    console.log('Role : '+decoded.role)

    if(role === 'admin')
    {
        next();
    }
    else
    {
        return next(new ErrorHandler('Not Authorized Admin'));
    }
    
})


