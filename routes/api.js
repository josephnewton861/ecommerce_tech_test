const apiRouter = require("express").Router();
const customerRouter = require('./customer');
const productsRouter = require('./products');
const ordersRouter = require('./orders');

apiRouter.get("/", (req, res, next) => res.send({ msg: 'here in get route' }));


// CUSTOMER
apiRouter.use('/customer', customerRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/orders', ordersRouter);
// apiRouter.patch('/customer', customerRouter);
// apiRouter.delete('/customer', customerRouter)
// apiRouter.get('/customer', customerRouter);

// Routes 
//USERS
// insert user through registration 
// update user
// delete user
// login user

//PRODUCTS
// get products
// get specific products
// filter products by category type currently in stock
// sort products by popularity, release date, price

// Orders
// Get all Previous orders
// Get individual order

// BASKET
// Insert record to orders table if item is confirmed

module.exports = apiRouter;