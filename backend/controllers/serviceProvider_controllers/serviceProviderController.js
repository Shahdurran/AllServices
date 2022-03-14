const SP = require('../../models/serviceProvider');
const ErrorHandler = require('../../utils/errorHandler')
const catchAsyncError = require('../../middleware/catchAsyncError')
const APIFeatures = require('../../utils/apiFeatures');
// creating new product  =>  /api/v1/admin/product/new

exports.newSP = catchAsyncError( async (req, res, next) => {

    req.body.user = req.user._id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})


// get all products => /api/v1/admin/getServiceProvider
exports.getAllServiceProviders = catchAsyncError( async (req, res, next) => {

    const resultsPerPage = 2;
    const serviceProviderCount = await SP.countDocuments();
    const apiFeature = new APIFeatures(SP.find(), req.query).search().filter().pagination(resultsPerPage);
    const serviceProviders = await apiFeature.query;

    res.status(200).json({
        success: true,
        // countOfServiceProviders: serviceProviders.length,
        message: 'this will show ever product in database',
        serviceProviderCount,
        serviceProviders
    });
})

// GET single product detail => /api/v1/product/:id for admin
exports.getSingleSP = catchAsyncError( async (req, res, next) => {

    let serviceProvider = await SP.findById(req.params.id);

    if (!serviceProvider) {

        return next(new ErrorHandler('product not found', 404));
    }

    res.status(200).json({
        success: true,
        serviceProvider
    })
})

// // UPDATE services => /api/v1/sp/:id
exports.updateSP = catchAsyncError( async (req, res, next) => {

    let sp = await SP.findById(req.params.id);

    if (!sp) {
        return res.status(404).json({
            success : false,
            message : "Product not found"
        })
    }

    sp = await SP.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    });

    res.status(200).json({
        success : true,
        sp
    })
})

// // DELETE product  => /api/v1/admin/product/:id 

exports.deleteSP = catchAsyncError(async (req, res, next) =>{

    const sp = await SP.findById(req.params.id);

    if (!sp) {
        return res.status(404).json({
            success : false,
            message : "Product not found"
        })
    }

    await sp.remove();

    res.status(200).json({
        success : true,
        message : "Product is deleted"
    })

})

// status 
exports.status = catchAsyncError( (req, res, next)=>{

    console.log(req.sp.status);
})


