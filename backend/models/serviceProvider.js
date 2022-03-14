const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const crypto = require('crypto');

// service Model
const serviceSchema =  new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please enter the name.'],
        maxLenght : [50, 'Character limit cannot exceed 50.']
    },
    email : {
        type : String,
        required : [true, 'Please enter eamil address.'],
        validator : [true, 'Please enter valid email address.'],
        unique : true,
    },
    password : {
        type : String,
        required : [true, 'Please enter the password.'],
        minlenght : [6, 'Password lenght is characters.'],
        select : false  // will show in json when try to access
    },
    cnic : {
        type : Number,
        required : [true,'Please enter CNIC number.'],
        minlengh : [13, 'CNIC number lenght must be 13 digits.'],
        maxLenght : [13, 'CNIC number lenght must be 13 digits.']
    },
    phoneNo : {
        type : String,
        required : true
    },
    avatar : {
        public_id :{
            type : String,
            required : true
        }, 
        url : {
            type : String,
            required : true
        }
    },
    serviceCategories: [{
        type : String,
        // required : [true, 'Please enter few services.'],
        enum : {
            values : [
                'Electronics',
                'Accessories',
                'Food',
                'Cloths/Shoes',
                'Beauty/Health',
                'OutDoors',
                'Home'
            ],
            message : 'Please select the correct service categories for the service.'
        }
    }],
    numOfReviews: {
        type : Number ,
        default : 0
    },
    reviews : [
    {    name : {
            type : String,
            // required : true
        },
        rating : {
            type : String,
            // required : true
        },
        comment : { 
            type : String,
            // required : true       
        }
    }],
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
        //   required: true
        },
        coordinates: {
          type: [Number],
        //   required: true
        }
      },
    Status : {
          type : String,
          default : "online"
      },
    role : {
        type : String,
        default : "service provider" // also can add admin panel
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date


});

// Password Hash
serviceSchema.pre('save', async function(next){
    
    if(!this.isModified('password')){ //isModied = mongoose.prototype.isModified
        next()
    }

    this.password = await bcrypt.hash(this.password, 10);

});

// Compare Passwords
serviceSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

// Return JSON WEB TOKEN
serviceSchema.methods.getJwtToken = function(){
    return jwt.sign({
        _id : this._id
    },process.env.JWT_SECRET,{expiresIn : process.env.JWT_EXPIRESTIME});
}

// Reset Password Token
serviceSchema.methods.getRestPasswordToken = function(){
    // generate simple token
    const resetToken =  crypto.randomBytes(20).toString('hex') //to generate some random bytes

    // hash and set to resetPassowrdToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 60;

    return resetToken;
} 

module.exports = mongoose.model('ServiceP', serviceSchema);

// Electronics
// Accessories
// Food
// Cloths/Shoes
// Beauty/Health
// OutDoors
// Home