const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsycnError = require('../middleware/catchAsyncError');
const mongoose = require('mongoose')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto'); //builtin package not need to install
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncError = require('../middleware/catchAsyncError');

//  Register a user =>/api/v1/register

exports.registerUser = catchAsycnError( async (req, res, next) =>{

    const {name, email, password} = req.body
    // let user = new User
    const user = await User.create({
        name,
        email,
        password,
        avatar : {
            public_id : 'products/1',
            url : 'url-1'
             }
    });

    const token = user.getJwtToken();
 
    res.status(201).json({
        success : true,
        user,
        token
    })
    sendToken(user, 200, res);
});

// Login user => /api/v1/login

exports.loginUser = catchAsycnError( async (req, res, next)=>{

    const {email, password} = req.body;
    
    //Checks if email and password is enter by user
    
    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password', 400));

    }

    // Finding user in data base
    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password', 400));
    }

    // Check if password is correct
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Please enter correct email & password', 400));
    }

    const token = user.getJwtToken();

    // res.status(200).json({
    //     sucess : true,
    //     token 
    // })
    sendToken(user, 200, res); 
})


// Forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsycnError( async (req, res, next)=>{

    const user = await User.findOne({ email : req.body.email});

    if(!user){
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get  reset token
    const resetToken = user.getRestPasswordToken();

    await user.save({validateBeforeSave : false});

    // create reset password URl
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    // console.log(resetUrl) : http://localhost:4000/api/v1/password/reset/0543459564116d806a546f2ab60039862eaa9431

    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email,then ignore it.`

    try{
        await sendEmail({email : user.email, subject : 'Password Recovery', message})
        res.json({
            success : true,
            message : `Email sent to: ${user.email}`
        })
    } catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validatedBeforeSave : false});

        return next(new ErrorHandler(error.message, 500));
    }

})


// Reset password => /api/v1/password/reset/:token
// Remember that the reset token will expire in 30 minutes after that send again FORGOT PASSWORD request. Get  new url
exports.resetPassword = catchAsycnError( async (req, res, next)=>{

    // Hash url token  : what ever in url we have to hash it and compare the token to if user token is legit or not
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({ 
        resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()}
    })

    if(!user){
        return next(new ErrorHandler('Reset Password token is invalid or expired', 400));
    }

    // checking if passowrd and confirm passwords are same
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Passwords does not match', 400));
    }

    // Setup new Password
    user.password = req.body.password;

    // undefining : user.resetPasswordToken = undefined and user.resetPasswordExpire = undefined;
 
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
})

// Get currently logged in user profile => /api/v1/me
exports.getUserProfile = catchAsycnError( async (req, res, next)=>{ 
    console.log("geting profile")
    const user = await User.findById(req.user._id)
    // console.log(user.name)
    res.status(200).json({
        success :true,
        user
    })
})

exports.getUserId = catchAsycnError( async (req, res, next)=>{ 
    console.log("get in user id")
    const user = await User.findById(req.user._id)
    // console.log(user.name)
   return user
})

// update / Change Password => /api/v1/password/update
exports.updatePassword = catchAsycnError( async(req, res, next)=>{

    const user = await User.findById(req.user._id).select('+password');

    //check previous password
    const isMatched = await user.comparePassword(req.body.oldPassword);

    if(!isMatched){
        return next(new ErrorHandler('Old passward is incorrect'));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res);

})

// update / Change Profile => /api/v1/user/me/update
exports.updateProfile = catchAsycnError( async(req, res, next)=>{

    console.log("update profle");

    const newUserData = {
        name : req.body.name,
        email : req.body.email
    }
    // update avatar to do 
    console.log(newUserData, req.user._id);

    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    })

    res.status(200).json({
        success : true,
        name : newUserData.name,
        email : newUserData.email,

    })
})

// get user details => /api/v1/admin/user/:id
exports.findUserByName = catchAsycnError( async(req, res, next)=>{
    
    const user = await User.find({email: req.body.email, name : req.body.name});
    // console.log("sp.name : "+sp.name)
    console.log("find by name : " + user)
    if(!user){
        return next(new ErrorHandler(`User not Found with name ${req.body.name}`));
    }

    res.status(200).json({
        success : true,
        user 
    })

    
})


// logout User => /api/v1/logout
exports.logout = catchAsycnError( async(req, res, next)=>{
    res.cookie('token', null, {
        expires : new Date(Date.now()),
        httpOnly : true
    })

    res.status(200).json({
        success : true,
        message : 'logged Out'
    })
})


// Admin routes 
// get all user => /api/v1/admin/user
exports.allUsers = catchAsycnError( async(req, res, next)=>{
    
    const users = await User.find();
    
    res.status(200).json({
        success : true,
        users
    })

})

// get user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsycnError( async(req, res, next)=>{
    
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User not Found with ID ${req.params.id}`));
    }

    res.status(200).json({
        success : true,
        user
    })

    
})
// Remove User (Admin) => /api/v1/admin/user/:id
exports.removeUser = catchAsycnError( async(req, res, next)=>{
    
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User not Found with ID ${req.params.id}`));
    }

    // remove user avatar - TODO

    await user.remove();

    res.status(200).json({
        success : true,
    })

    
})


// update / Change Profile (Admin)=> /api/v1/admin/user/:id
exports.updateProfileAdmin = catchAsycnError( async(req, res, next)=>{
    console.log("admin update")
    const newUserData = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role
    } 

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    })

    res.status(200).json({
        success : true,

    })
})


// OTA

exports.registerUserOTA = catchAsyncError(async(req, res, next)=>
{
    const {phone} = req.body;

    res.status(201).json({
        phone
    })
});

