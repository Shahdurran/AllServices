const Order = require('../models/order');
const Prduct = require('../models/product');
const SP = require('../models/serviceProvider');
const User = require('../models/serviceProvider');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const jwt = require('jsonwebtoken');
const {getUserId} = require("../controllers/userContoller");
const {getSpId} = require("../controllers/serviceProvider_controllers/SPcontroller");

// const {userID, spID} =require("../middleware/auth")
// create new order => /api/v1/order/new -User -service provider

exports.newOrder = catchAsyncError( async(req, res, next)=>{

    const {
        orderItem,
        bookingInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    }=req.body
    
    // fetching user 

    const userIDf= await getUserId(req,res,next);
    console.log("user"+userIDf);

    const spIDf= await getSpId(req,res,next);
    console.log("spIDf "+spIDf)
    // const userID = await findById(userIDf._id);
    
    const details ={
            username : userIDf.name,
            userID : userIDf._id,
            productID : req.body.productID,
        };

    const pid = await Prduct.findById(req.body.productID);
    
    console.log("pid : "+pid);

    const productDetails = {
        id : pid._id,
        name : pid.name,
        seller : pid.seller,
        category : pid.category,
        price : pid.price,
        serviceProvider : pid.serviceProvider
        // serviceProvider : {
        //     spname: pid.spname,
        //     spid: pid.spid,
        // },
    }
    
    const order = await Order.create({
        orderItem,
        bookingInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        // paymentInfo,
        paidAt : Date.now(),
        // user:req.user._id,
        details,
        productDetails,
    });

    res.status(200).json({
        success : true,
        order
    })
});


//  Get single Order => /api/v1/order/:id -Admin
exports.getSingleOrder = catchAsyncError( async(req, res, next)=>{

    const order = await Order.findById(req.params.id).populate()

    if(!order){
        return next(new ErrorHandler('No order found with this ID', 404))
    }

    res.status(200).json({
        success :true,
        order
    })
});

//  Get logged in User Order => /api/v1/orders/me -User
exports.myOrders = catchAsyncError( async(req, res, next)=>{

    console.log(req.user._id);
    const orders = await Order.find({user : req.user._id})

    if(!orders){
        return next(new ErrorHandler('No order found with this ID', 404))
    }

    res.status(200).json({
        success :true,
        orders
    })
});

// get all order(Admin) => /api/v1/admin/orders -User -Admin
exports.allOrders = catchAsyncError( async(req, res, next)=>{

    console.log(req.user._id);
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount = totalAmount + order.totalPrice
    })

    if(!orders){
        return next(new ErrorHandler('No order found with this ID', 404))
    }

    res.status(200).json({
        success :true,
        totalAmount,
        orders
    })
});

// Update/Process order(Admin) => /api/v1/admin/order/:id
exports.updateOrders = catchAsyncError( async(req, res, next)=>{

    // console.log(req.user._id);
    const order = await Order.findById(req.params.id)

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('Order already delivered',400))
    }

    order.orderItem.forEach(async order => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now();
    await order.save({validateBeforeSave : false})

    res.status(200).json({
        success :true
    })
});

async function updateStock(id, quantity){

    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save();
}

// Delete Order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncError( async(req, res, next)=>{

    const order = await Order.findById(req.params.id).populate()

    if(!order){
        return next(new ErrorHandler('No order found with this ID', 404))
    }

    await order.remove()
    res.status(200).json({
        success :true
    })
});