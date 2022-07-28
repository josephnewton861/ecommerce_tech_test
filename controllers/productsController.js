const {
    fetchAllProducts,
    fetchSingleProduct,
    fetchProductsByCategory,
} = require('../models/products');

exports.getAllProducts = (req, res, next) => {

    fetchAllProducts()
        .then(({products}) => {
            return res.status(200).send(products)
        }).catch((err) => {
            return res.status(404).send(err);
    })
},

exports.getProductsByCategory = (req, res, next) => {
    const {category} = req.params; 
    fetchProductsByCategory(category)
        .then(({products}) => {
            return res.status(200).send(products)
        }).catch((err) => {
            return res.status(404).send(err);
    })
},

exports.getIndividualProduct = (req, res, next) => {
    const {category, slug} = req.params; 
    fetchSingleProduct(category, slug)
        .then(({product}) => {
            return res.status(200).send(product)
        }).catch((err) => {
            return res.status(404).send(err);
    })
}