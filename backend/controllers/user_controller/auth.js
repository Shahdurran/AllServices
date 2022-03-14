const User = require("../models/user.js");
const {registerValidation, 
    loginValidation, 
    tokenExpire, 
    tokenValue, 
    valueRevert, 
    logoutUser} = require('../Authentication/validation');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// validation library
const joi = require('@hapi/joi');


const schema = joi.object({
    name : joi.string()
    .min(6)
    .required(),
    email : joi.string()
    .min(6)
    .required()
    .email(),
    password : joi.string()
    .min(6).
    required()

})


exports.register = async(req,res)=>{
console.log("in register");

    // validate the data before we make a user
  
    const {error} = await registerValidation(req.body);
    if(error) return res.status(400).send("validation err");
  

    // checking if user already exists
    const emailExit = await User.findOne({email : req.body.email});
    if(emailExit) res.status(400).send('Email alredy exist');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    });
    try{
        console.log(req.body.name +" "+req.body.email +" "+req.body.password);
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch(err){
        res.status(400).send(err);
    }
}

// LOGIN
exports.login = async (req, res)=>{

  

    console.log("loginValidation")
    const {error} = await loginValidation(req.body);
    if(error) return res.status(400).send("logIn err"); 

    // checking if email exists
    console.log("email check")
    // const user = await User.findOne({email : req.body.email});
    const user = await User.findOne({email : req.body.email});
    console.log(user)
    if(!user) return res.status(400).send('email or password doesnt exist');

    // PASSWORD IS CORRECT
    console.log("password check")
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('password is not correct');

    // CREATE AND ASSIGN TOKEN
    console.log(process.env.TOKEN_SECRET);
    const token = await jwt.sign({_id : user._id}, process.env.TOKEN_SECRET);
    console.log("login user ===== "+user);
    res.header("auth-token", token).send({token : token, id : user._id });


    console.log("\n\n\nIn login now sending data");   
}


// LOGOUT
exports.logout = (req, res) => {
    
    console.log("in loggout")
    const token = jwt.sign({foo : "fool"}, process.env.TOKEN_SECRET,{expiresIn : "1"});
    tokenValue(token);
    res.status(202).send({message : "User is logged out"})
    logoutUser(0);
  }
  
