const {con, host} = require('../db/connection');

exports.fetchCustomerIfLoggedIn = (username, password, email) => {
    console.log(username, password, email, 'in model params');
    let query = `SELECT * FROM ${host}.customers 
    WHERE username = '${username}' or email = '${email}' and password = '${password}';`
    return new Promise((resolve, reject) => {
        con.query(
            query, (err, result)  => {
                if (err || !result.length) {
                    return reject({
                        status: 404,
                        msg: `Username: ${username} / email: ${email} and or password not found`
                    })
                }
                return resolve(result);
            }
        )
    })
}

exports.insertCustomer = (username, password, address, email, postcode) => {
    //insertCustomer(username, password, address, email, address, postcode)

}

exports.deleteCustomer = (username) => {
    //deleteCustomer(username)

}

exports.updateCustomer = (address, postcode) => {
    //updateCustomer(address, postcode)

}

// const query = "INSERT INTO test.products (name, style, price, sizes, discount, img, gender, category, colour, stock_left, designer, slug, release_date) VALUES ?";

// con.query(
//     query,
//     [formattedData.map(item => [item.name, item.style, item.price, item.sizes, null, item.img, item.gender, item.category, item.colour, item.stock_left, item.designer, item.slug, item.release_date])], function 
//     (error, results) {
//     console.log(error);
//     }
// );

