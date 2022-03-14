const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); //builtin package not need to install
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLenght: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter email address'],
        unique: true,
        validator: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter the password'],
        minlenght: [6, 'Password lenght must be greater than 6'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    },
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
    order: {
        product: {
            type: [mongoose.Schema.ObjectId, mongoose.Schema.name],
            required: true,
            ref: "product"
        }

    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

// Encryption password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { //isModied = mongoose.prototype.isModified
        next()
    }

    this.password = await bcrypt.hash(this.password, 10);

})

// Compare User password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//  Return JWT token

userSchema.methods.getJwtToken = function () {
    return jwt.sign({
        _id: this._id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESTIME
    });
}

//generate password reset token
userSchema.methods.getRestPasswordToken = function () {
    // generate simple token
    const resetToken = crypto.randomBytes(20).toString('hex') //to generate some random bytes

    // hash and set to resetPassowrdToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 60;

    return resetToken;
}

userSchema.methods.getCurrentUser = function () {
    return {
        id : this._id,
        name : this.name,
    }
}
module.exports = mongoose.model('User', userSchema)