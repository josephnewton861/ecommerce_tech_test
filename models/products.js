const {con} = require('../db/connection');

exports.fetchAllProducts = () => {
    let query = `SELECT * FROM PRODUCTS ORDER BY release_date desc;`
    return new Promise((resolve, reject) => {
        con.query(
            query, (err, result)  => {
                if (err) {
                    return reject({
                        status: 500,
                        msg: `Unable to get products`
                    })
                }
                return resolve({products: result});
            }
        )
    })
}

exports.fetchProductsByCategory = (category) => {
    let query = `SELECT * FROM PRODUCTS WHERE category = '${category}' ORDER BY release_date desc;`
    return new Promise((resolve, reject) => {
        con.query(
            query, (err, result)  => {
                if (err || !result.length) {
                    return reject({
                        status: 404,
                        msg: `Unable find product category of ${category}`
                    })
                }
                return resolve({products: result});
            }
        )
    })
}

exports.fetchSingleProduct = (category, slug) => {
    let query = `SELECT * FROM PRODUCTS 
    WHERE category = '${category}' and slug = '${slug}' 
    ORDER BY release_date desc;`
    return new Promise((resolve, reject) => {
        con.query(
            query, (err, result)  => {
                if (err || !result.length) {
                    return reject({
                        status: 404,
                        msg: `Unable to find product`
                    })
                }
                return resolve({product: result});
            }
        )
    })
}

exports.patchStockLeft = (product_ids) => {
    let query = `UPDATE PRODUCTS SET
    stock_left = GREATEST(0, stock_left - ${1}) WHERE id in (${product_ids})`
    return new Promise((resolve, reject) => {
        con.query(
            query, (err, result)  => {
                if (err) {
                    return reject({
                        status: 404,
                        msg: `Unable to update stock number`
                    })
                }
                return resolve({msg: 'Updated stock count'});
            }
        )
    })
}

