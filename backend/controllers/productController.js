const Product = require('../models/product');
const SP = require('../models/serviceProvider')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures');
// creating new product  =>  /api/v1/admin/product/new

exports.newProduct = catchAsyncError(async (req, res, next) => {

    req.body.serviceProvider = req.sp._id;
    const sp = await SP.findById(req.sp._id);
    console.log("sp id : " + sp._id + "\n sp_name : "+ sp.name );

    if(!sp)
    {
        return next(new ErrorHandler('Service provider not found', 404));
    } 
    if(sp.name == req.body.sp_name && sp.id == req.body.sp_id)
    {
        return next(new ErrorHandler('Service provider not found', 404));
    }

    // console.log("req.body.user = " + req.body.user + " req.user.id = " + req.user.id)
    // console.log('req.user._id : ' + req.user._id)
    
    console.log('req.body.sp  : ' + req.body.serviceProvider)
    const serviceP = req.body.serviceProvider;
    console.log("sericeP : "+serviceP)

    const product = await Product.create({
        name : req.body.name,
        price : req.body.price,
        ratings : req.body.ratings,
        category : req.body.category,
        numOfReviews : req.body.numOfReviews,
        reviews : req.body.reviews,
        serviceProvider : {
            spid: sp._id,
            spname : sp.name
        },
       
    });

    res.status(201).json({
        success: true,
        product
    })
})

// 616ddddf5a36bf8b1eee4556
// 616ddddf5a36bf8b1eee4556

// Show random products in 2 miles
exports.randomProducts = catchAsyncError(async (req, res, next) => {


    // const apiFeature = new APIFeatures(Product.find(), 'null').search().filter().pagination(resultsPerPage);


});

// get all products => /api/v1/products -User
// home page (search)
exports.getProducts = catchAsyncError(async (req, res, next) => {

    // let products = new Product;

    const resultsPerPage = 10;
    const productCount = await Product.countDocuments();

    const apiFeature = new APIFeatures(Product.find(), req.query).search().filter().pagination(resultsPerPage);

    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        countOfProducts: products.length,
        message: 'this will show ever product in database',
        productCount,
        products
    });
})

// GET single product detail => /api/v1/product/:id
// home page 
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {

        return next(new ErrorHandler('product not found', 404));
    }

    // var sp_status = await check(product);

    // console.log(sp_status)
    res.status(200).json({
        success: true,
        // sp_status,
        product
    })
})

async function check(product)
{
  
    console.log("Product : " + product.serviceProvider)
    const sp_id = product.serviceProvider;
    var sp = await SP.findById(sp_id);
    console.log("STATUS  :  " + sp.Status);
    return sp.Status

}
// UPDATE products => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})

// DELETE product  => /api/v1/admin/product/:id

exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product is deleted"
    })

})