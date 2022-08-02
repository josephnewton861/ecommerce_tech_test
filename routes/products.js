const productsRouter = require('express').Router();

const {
    getAllProducts,
    getProductsByCategory,
    getIndividualProduct,
    updateProductStock
} = require ('../controllers/productsController')
productsRouter
    .route('/')
    .get(getAllProducts)
    .patch(updateProductStock)

productsRouter
    .route('/:category')
    .get(getProductsByCategory)

productsRouter
    .route('/:category/:slug')
    .get(getIndividualProduct)

module.exports = productsRouter;