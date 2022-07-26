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




// get products
// get specific products
// filter products by category type currently in stock
// sort products by popularity, release date, price

module.exports = productsRouter;