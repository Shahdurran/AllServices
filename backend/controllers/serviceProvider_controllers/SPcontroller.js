const SP = require('../../models/serviceProvider');
const ErrorHandler = require('../../utils/errorHandler');
const catchAsycnError = require('../../middleware/catchAsyncError');
const mongoose = require('mongoose')
// const sendToken = require('../../utils/jwtToken')
const sp_jwt = require('../../utils/sp_jwt')
const sendEmail = require('../../utils/sendEmail')
const crypto = require('crypto'); //builtin package not need to install

//  Register a user =>/api/v1/register

exports.registerSP = catchAsycnError( async (req, res, next) =>{

    const {name, email, password, cnic, phoneNo} = req.body
    // let user = new User
    const sp = await SP.create({
        name,
        email,
        password,
        cnic,
        phoneNo,
        avatar : {
            public_id : 'products/1',
            url : 'url-1'
             }
    });

    const token = sp.getJwtToken();

    res.status(201).json({
        success : true,
        sp,
        token
    })
    sp_jwt(sp, 200, res);
});

// Login user => /api/v1/login

exports.loginSP = catchAsycnError( async (req, res, next)=>{

    const {email, password} = req.body;
    
    //Checks if email and password is enter by user
    
    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password', 400));

    }

    // Finding user in data base
    const sp = await SP.findOne({email}).select('+password');

    if(!sp){
        return next(new ErrorHandler('Invalid Email or Password', 400));
    }

    // Check if password is correct
    const isPasswordMatched = await sp.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Please enter correct email & password', 400));
    }

    const token = sp.getJwtToken();

    sp_jwt(sp, 200, res); 
})


// Forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsycnError( async (req, res, next)=>{

    const sp = await SP.findOne({ email : req.body.email});

    if(!sp){
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get  reset token
    const resetToken = sp.getRestPasswordToken();

    await sp.save({validateBeforeSave : false});

    // create reset password URl
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    // console.log(resetUrl) : http://localhost:4000/api/v1/password/reset/0543459564116d806a546f2ab60039862eaa9431

    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email,then ignore it.`

    try{
        await sendEmail({email : sp.email, subject : 'Password Recovery', message})
        res.json({
            success : true,
            message : `Email sent to: ${sp.email}`
        })
    } catch(error){
        sp.resetPasswordToken = undefined;
        sp.resetPasswordExpire = undefined;

        await sp.save({validatedBeforeSave : false});

        return next(new ErrorHandler(error.message, 500));
    }

})


// Reset password => /api/v1/password/reset/:token
// Remember that the reset token will expire in 30 minutes after that send again FORGOT PASSWORD request. Get  new url
exports.resetPassword = catchAsycnError( async (req, res, next)=>{

    // Hash url token  : what ever in url we have to hash it and compare the token to if user token is legit or not
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const sp = await SP.findOne({ 
        resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()}
    })

    if(!sp){
        return next(new ErrorHandler('Reset Password token is invalid or expired', 400));
    }

    // checking if passowrd and confirm passwords are same
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Passwords does not match', 400));
    }

    // Setup new Password
    sp.password = req.body.password;

    // undefining : user.resetPasswordToken = undefined and user.resetPasswordExpire = undefined;
 
    sp.resetPasswordToken = undefined;
    sp.resetPasswordExpire = undefined;

    await sp.save();

    sp_jwt(sp, 200, res);
})

// Get currently logged in user profile => /api/v1/me
exports.getSPProfile = catchAsycnError( async (req, res, next)=>{ 
    
    const sp = await SP.findById(req.sp._id)
    res.status(200).json({
        success :true,
        sp
    })
})

exports.getSpId = catchAsycnError( async (req, res, next)=>{ 
    // console.log("\nget sp id")
    // const sp = await SP.findById(req.sp._id)
    // console.log("sp " + sp)
    // return sp;
})

// update / Change Password => /api/v1/password/update
exports.updatePassword = catchAsycnError( async(req, res, next)=>{

    const sp = await SP.findById(req.sp._id).select('+password');

    //check previous password
    const isMatched = await sp.comparePassword(req.body.oldPassword);
    console.log("ismatch : "+isMatched)
    if(!isMatched){
        return next(new ErrorHandler('Old passward is incorrect'));
    }

    user.password = req.body.password;
    await user.save();

    sp_jwt(user, 200, res);

})

// update / Change Profile => /api/v1/password/me/update
exports.updateProfile = catchAsycnError( async(req, res, next)=>{

    const newSPData = {
        name : req.body.name,
        email : req.body.email,
        phoneNo : req.body.phoneNo,
        location : req.body.location,

    }
    // update avatar to do 

    const sp = await SP.findByIdAndUpdate(req.sp._id, newSPData, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    })

    res.status(200).json({
        success : true,
        sp : {
            name : sp.name,
            email : sp.email,
            Phone : sp.phoneNo,
            Location : sp.location,
        }

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
exports.allSP = catchAsycnError( async(req, res, next)=>{
    
    const sp = await SP.find();

    res.status(200).json({
        success : true,
        sp
    })

})

// get user details => /api/v1/admin/user/:id
exports.getSPDetails = catchAsycnError( async(req, res, next)=>{
    
    const sp = await SP.findById(req.params.id);

    if(!sp){
        return next(new ErrorHandler(`User not Found with ID ${req.params.id}`));
    }

    res.status(200).json({
        success : true,
        sp
    })

    
})





// get user details => /api/v1/admin/user/:id
exports.findSpByName = catchAsycnError( async(req, res, next)=>{
    
    const sp = await SP.find({email: req.body.email, name : req.body.name});
    // console.log("sp.name : "+sp.name)
    console.log("find by name : " + sp)
    if(!sp){
        return next(new ErrorHandler(`User not Found with name ${req.params.name}`));
    }

    res.status(200).json({
        success : true,
        sp 
    })

    
})
// Remove User (Admin) => /api/v1/admin/user/:id
exports.removeSP = catchAsycnError( async(req, res, next)=>{
    
    const sp = await SP.findById(req.params.id);

    if(!sp){
        return next(new ErrorHandler(`User not Found with ID ${req.params.id}`));
    }

    // remove user avatar - TODO

    await sp.remove();

    res.status(200).json({
        success : true,
    })

    
})


// update / Change Profile (Admin)=> /api/v1/admin/user/:id
exports.updateProfileAdmin = catchAsycnError( async(req, res, next)=>{

    console.log("SP update profile");
    const newSPData = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role
    } 
    console.log("New SP Data\n" + newSPData)
    const sp = await SP.findByIdAndUpdate(req.params.id, newSPData, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    })

    res.status(200).json({
        success : true,

    })
})
