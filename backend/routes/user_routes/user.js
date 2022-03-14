const express = require('express');
const router = express.Router();

const {registerUser, 
    loginUser, 
    forgotPassword, 
    resetPassword, 
    logout,
    getUserProfile,
    updatePassword,
    updateProfile,
    allUsers,
    getUserDetails,
    updateProfileAdmin,
    findUserByName } = require('../../controllers/userContoller');

const { isAuthenticatedUser, isAuthenticatedAdmin } = require('../../middleware/auth')

// register
router.route('/user/register').post(registerUser);

// login
router.route('/user/login').post(loginUser);

// reset
router.route('/user/password/forgot').post(forgotPassword);
router.route('/user/password/reset/:token').put(resetPassword); //for reset url got to mailtrap.io and copy the link

// Profile
router.route('/user/me').get(isAuthenticatedUser,getUserProfile);

// Update password
router.route('/user/password/update').put(isAuthenticatedUser, updatePassword);

// update profile
router.route('/user/me/update').put(isAuthenticatedUser, updateProfile);

// logout
router.route('/user/logout').get(logout);

//findSpByName
router.route('/user/findUserByName').post(isAuthenticatedUser,findUserByName);


// Admin Routes       ************ TODO ************
 router.route('/admin/user/:name').get(isAuthenticatedUser, allUsers);
 router.route('/admin/user/:id').get(isAuthenticatedAdmin, getUserDetails).put(isAuthenticatedAdmin,updateProfileAdmin)
module.exports = router;