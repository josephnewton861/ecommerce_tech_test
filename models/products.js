const {con, host} = require('../db/connection');

console.log(con, host, 'rer')

// let testQuery = `SELECT * FROM ${host}.PRODUCTS ORDER BY release_date desc;`
// let tetPromise = new Promise((resolve, reject) => {
//     con.query(
//         testQuery, (err, result)  => {
//             if (err) {
//                 return reject({
//                     status: 500,
//                     msg: `Unable to get products`
//                 })
//             }
//             console.log(result, 'here')
//             return resolve({products: result});
//         }
//     )
// })
// console.log(tetPromise, 'PROMISE')


exports.fetchAllProducts = () => {
    console.log(host, con)
    let query = `SELECT * FROM PRODUCTS ORDER BY release_date desc;`
    return new Promise((resolve, reject) => {
        con.query(
            query, (err, result)  => {
                console.log(result, err, host);
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

