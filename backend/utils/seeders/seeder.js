const dotenv = require('dotenv');
dotenv.config({
    path : "config/config.env"
})

console.log(process.env.PORT);

const Product = require('../../models/product');
const Order = require('../../models/order');
const ServiceP = require('../../models/serviceProvider');
const User = require('../../models/user');

const connectDataBase = require('../../config/database');

const serviceP = require('../../data/serviceProviders.json');
const products = require('../../data/products2.json');
const users = require('../../data/users.json');

connectDataBase();

const seedServiceP = async() =>{
    try{

        await ServiceP.deleteMany();
        console.log("All service-providers are deleted");

        await ServiceP.insertMany(serviceP);
        console.log("All service-providers are added");

        process.exit();


    }
    catch(error){
        console.log(error.message);
        process.exit();
    }
}
const seedOrder = async() =>{
    try{

        await Order.deleteMany();
        console.log("All service-providers are deleted");

        await Order.insertMany(order);
        console.log("All service-providers are added");

        process.exit();


    }
    catch(error){
        console.log(error.message);
        process.exit();
    }
}
const seedProduct = async() =>{
    try{

        await Product.deleteMany();
        console.log("All Products are deleted");

        await Product.insertMany(products);
        console.log("All Products are added");

        process.exit();


    }
    catch(error){
        console.log(error.message);
        process.exit();
    }
}
const seedUser = async() =>{
    try{

        await User.deleteMany();
        console.log("All Users are deleted");

        await User.insertMany(users);
        console.log("All User are added");

        process.exit();


    }
    catch(error){
        console.log(error.message);
        process.exit();
    }
}
seedServiceP();
// seedProduct();
seedUser();

