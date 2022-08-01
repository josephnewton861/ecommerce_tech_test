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

module.exports = ordersRouter;