const express = require('express');
const router = express.Router();


const {
    newOrder,
    getSingleOrder,
    myOrders,
    allOrders, updateOrders, deleteOrder
} = require('../../controllers/orderController');
const {
    isAuthenticatedUser,isAvailable
} = require('../../middleware/auth')


// router.route('/order/new').post(isAuthenticatedUser,isAvailable, newOrder);
router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);
router.route('/orders/admin').get(isAuthenticatedUser, allOrders);
router.route('/orders/admin/:id').put(isAuthenticatedUser, updateOrders);
router.route('/orders/admin/:id').delete(isAuthenticatedUser, deleteOrder);

module.exports = router;