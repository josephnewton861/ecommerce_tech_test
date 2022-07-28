const {con, host} = require('../db/connection');


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
    let query = `SELECT * FROM ${host}.PRODUCTS WHERE category = '${category}' ORDER BY release_date desc;`
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
    let query = `SELECT * FROM ${host}.PRODUCTS 
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

