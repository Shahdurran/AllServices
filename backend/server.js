// dotennv config
require('dotenv').config({
    path : 'config/config.env'
})


// app import
const app = require('./app');

// Handle Uncaught esxeption      occur when something undefined
process.on('uncaughtException',err=>{
    console.log(`ERROR : ${err.message}  \nCOMPLETE ERROR STACK : ${err.stack}`);
    console.log('server is shutting down due to uncaught error');
    process.exit(1);    
})

// DB import
const connectDatabase = require('./config/database');
connectDatabase();

// Server
const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is running ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

// Handle Unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR : ${err.stack}`);
    console.log('Server is shutting down due to Unhandled promise rejections');
    server.close(()=>{
        process.exit(1);
    });
})






















// const express = require('express');
// const app = express();