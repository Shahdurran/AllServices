const express = require('express');
const router = express.Router();

const {registerSP, 
    loginSP, 
    forgotPassword, 
    resetPassword, 
    logout,
    getSPProfile,
    updatePassword,
    updateProfile,
    updateProfileAdmin,
    findSpByName } = require('../../controllers/serviceProvider_controllers/SPcontroller');

const { isAuthenticatedSP } = require('../../middleware/auth')

// register
router.route('/sp/register').post(registerSP);

// login
router.route('/sp/login').post(loginSP);

// reset
router.route('/sp/password/forgot').post(forgotPassword);
router.route('/sp/password/reset/:token').put(resetPassword); //for reset url got to mailtrap.io and copy the link

// Profile
router.route('/sp/me').get(isAuthenticatedSP,getSPProfile);

// Update password
router.route('/sp/password/update').put(isAuthenticatedSP, updatePassword);

// update profile
router.route('/sp/me/update').put(isAuthenticatedSP, updateProfile);

// logout
router.route('/sp/logout').get(logout);

// findSpByName
router.route('/sp/findSpByName').post(isAuthenticatedSP,findSpByName);
// Admin Routes       ************ TODO ************
// router.route('/admin/user').get(isAuthenticatedAdmin, allUsers);
// router.route('/admin/user/:id').get(isAuthenticatedAdmin, getUserDetails).put(isAuthenticatedAdmin,updateProfileAdmin)
module.exports = router;