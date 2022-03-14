const mongoose = require('mongoose');
var random = require('mongoose-random');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter product name'],
        trim: true,
        maxLenght: [100, 'Product name can not exceed 100 characters']
    },

    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLenght: [5, 'Product price cannot exceed 5 digits'],
        default: 0.0
    },
    // discription: {
    //     type: String,
    //     required: [true, 'please enter product discription']
    // },
    ratings: {
        type: Number,
        default: 0.0
    },
    images: [{
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    }],
    category: {
        type: String,
        // required: [true, 'Please select caterogy for this product'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Cloths/Shoes',
                'Beauty/Health',
                'Sports',
                'OutDoors',
                'Home'
            ],
            message: 'Please select the correct value for the product'
        }
    },
    // seller: {
    //     type: String,
    //     required: [true, 'Please enter product seller']
    // },
    // stock: {
    //     type: Number,
    //     required: [true, 'Please enter the Stock'],
    //     maxLenght: [5, 'Product name cannot exced 5 characters'],
    //     default: 0
    // },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        name: {
            type: String,
            required: true
        },
        rating: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    serviceProvider:[{
        spid : {
            type: String,
            require : true

        },
        spname : {
            type: String,
            require : true

        }
    }],
    // serviceProvider: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "ServiceP",
    //     required: true
    // },
    // service_provider_details: [{
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     phoneNo: {
    //         type: String,
    //         required: true
    //     },
    //     location: [{
    //         cordinates: {
    //             type: [Number],
    //             required: true,
    //             default: [0.0, 0.0]
    //         }

    //     }]
    // }],
    createdAt: {
        type: Date,
        default: Date.now
    }

});

productSchema.plugin(random, { path: 'r' });

module.exports = mongoose.model('product', productSchema);