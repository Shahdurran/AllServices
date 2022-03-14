const express = require('express');
const app = express();

const errorMiddleware = require('./middleware/errors');
const cookieParser = require('cookie-parser')


app.use(express.json());
app.use(cookieParser());



// import routers
const SP = require('./routes/serviceProvider/sp');
const user = require('./routes/user_routes/user');
const order = require('./routes/orders/orders');
const product = require('./routes/Products/products')

// router path set
app.use('/api/v1/', SP);
app.use('/api/v1/', user);
app.use('/api/v1/', order);
app.use('/api/v1/', product);






// Error handling
app.use(errorMiddleware);

module.exports = app;















