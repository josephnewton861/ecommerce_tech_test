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

    let query = `INSERT INTO ${host}.customers 
    (username, password, email, address, postcode, active) 
    VALUES ('${username}', '${password}', '${email}', '${address}', '${postcode}', ${1});`

    return new Promise((resolve, reject) => {
        con.query(
            query, (err, result)  => {
                if (err) {
                    if (err.sqlMessage.includes('Duplicate entry')) {
                        return reject({
                            status: 400,
                            msg: `Username needs to be unique`
                        })
                    }
                    return reject({
                        status: 400,
                        msg: `Unable to add user ${username} please look at your inputted details`
                    })
                }
                return resolve({msg: 'Successful registration'});
            }
        )
    })
}

exports.deleteCustomer = (username) => {
    let query = `DELETE from ${host}.customers WHERE username = '${username}'`
    return new Promise((resolve, reject) => {
        con.query(
            query, (err, result)  => {
                if (err) {
                    return reject({
                        status: 400,
                        msg: `Unable to delete user ${username}`
                    })
                }
                return resolve({msg: 'Successful deletion'});
            }
        )
    })
}

exports.updateCustomer = (address, postcode, username) => {
    //updateCustomer(address, postcode)
    console.log(address, postcode, username);
    let query = `UPDATE ${host}.customers SET address = '${address}', postcode = '${postcode}' WHERE username = '${username}'`
    return new Promise((resolve, reject) => {
        con.query(
            query, (err, result)  => {
                if (err) {
                    return reject({
                        status: 400,
                        msg: `Unable to update ${username} delivery details`
                    })
                }
                return resolve({msg: 'Successful update'});
            }
        )
    })
}

// const query = "INSERT INTO test.products (name, style, price, sizes, discount, img, gender, category, colour, stock_left, designer, slug, release_date) VALUES ?";

// con.query(
//     query,
//     [formattedData.map(item => [item.name, item.style, item.price, item.sizes, null, item.img, item.gender, item.category, item.colour, item.stock_left, item.designer, item.slug, item.release_date])], function 
//     (error, results) {
//     console.log(error);
//     }
// );

