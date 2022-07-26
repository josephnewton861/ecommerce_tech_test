const ordersRouter = require('express').Router();

const {
    getAllOrders,
    postOrder
} = require('../controllers/ordersController')

ordersRouter
    .route('/:customer_id')
    .get(getAllOrders)

ordersRouter
    .route('/:customer_id')
    .post(postOrder)

// orderRouter
//     .route('/product/:product_id')
//     .get(getSingleOrder)

module.exports = ordersRouter;