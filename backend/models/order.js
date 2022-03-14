const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    bookingInfo: {
        address: {
            type: String,
            required: [true, "Please Enter address"],
        },
        city: {
            type: String,
            required: [true, "Please Enter city"],
        },
        PhoneNo: {
            type: String,
            required: [true, "Please enter Phone Number"],
        },
        postalCode: {
            type: String,
            required: [true, "Please enter postalCode"],
        },
        country: {
            type: String,
            // required : true
        }
    },
    
    paidAt: {
        type: Date
    },
    servicePrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    bookingStatus: {
        type: String,
        required: true,
        default: 'Completed'
    },
    details : [{
        username: {
            type: String,
            required: [true, "Please enter username"],
            // ref: 'User'
        },
        userID : {
            type: String,
            required: [true, "Please enter user ID"],
        },

        productID : {
            type : mongoose.Schema.ObjectId,
            required : [true," Please enter product ID"]
        },
        serviceProvider:[{
            name:{
                type: String,
                required: [true, "Please enter service provider name"],
            },
            id : {
                type: String,
                required: [true, "Please enter Service Provider ID"],
            }
        }]
    }],
    productDetails :{
        id : {type:String, required : [true, "product id is required"]},
        name : {type:String, required : [true, "product name is required"]},
        // seller : {type:String, required : [true, "product seller is required"]},
        category : {type:String, required : [true, "product category is required"]},
        price : {type:String, required : [true, "product price is required"]},
        serviceProvider : [{
            spid : {type:String, required : [true, "service provider id is required"]},
            spname : {type:String, required : [true, "service provider name is required"]}
        }],
    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Order', orderSchema);