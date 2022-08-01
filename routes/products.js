const productsRouter = require('express').Router();

const {
    getAllProducts,
    getProductsByCategory,
    getIndividualProduct,
} = require ('../controllers/productsController')
productsRouter
    .route('/')
    .get(getAllProducts)

productsRouter
    .route('/:category')
    .get(getProductsByCategory)

productsRouter
    .route('/:category/:slug')
    .get(getIndividualProduct)

module.exports = productsRouter;