const dotenv = require('dotenv');
dotenv.config({
    path : "config/config.env"
})

console.log(process.env.PORT);

const Product = require('../../models/serviceProvider')
const products = require('../../data/serviceProviders.json');
const connectDataBase = require('../../config/database');

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

