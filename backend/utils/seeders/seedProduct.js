const dotenv = require('dotenv');
dotenv.config({
    path : "config/config.env"
})

console.log(process.env.PORT);

const Product = require('../../models/product');
// const Order = require('../models/order');
// const ServiceP = require('../models/serviceProvider');
// const User = require('../models/user');

const connectDataBase = require('../../config/database');

const products = require('../../data/products.json');

connectDataBase();

const seedProduct = async() =>{
    try{

        await Product.deleteMany();
        console.log("All service-providers are deleted");

        await Product.insertMany(products);
        console.log("All service-providers are added");

        process.exit();

    }
    catch(error){
        console.log(error.message);
        process.exit();
    }
}
seedProduct();

