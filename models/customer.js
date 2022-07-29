const {con} = require('../db/connection');

exports.fetchCustomerIfLoggedIn = (username, password, email) => {
    let query = `SELECT * FROM customers 
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

    let query = `INSERT INTO customers 
    (username, password, email, address, postcode, active) 
    VALUES ('${username}', '${password}', '${email}', '${address}', '${postcode}', ${0});`

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

exports.updateCustomersStatus = (username, status) => {
    let query = `UPDATE customers SET active = ${status} WHERE username = '${username}';`
    
    return new Promise((resolve, reject) => {
        con.query(
            query, (err, result)  => {
                if (err) {
                    return reject({
                        status: 400,
                        msg: `Cannot update users status`
                    })
                }
                return resolve({status: status, msg: 'Status updated successfuly'});
            }
        )
    })
},


exports.updateCustomer = (address, postcode, username) => {
    let query = `UPDATE customers SET address = '${address}', postcode = '${postcode}' WHERE username = '${username}'`
    return new Promise((resolve, reject) => {
        con.query(
            query, (err, result)  => {
                if (!result.affectedRows) {
                    return reject({
                        status: 404,
                        msg: `Unable to update ${username} delivery details`
                    })
                }
                return resolve({msg: 'Successful update'});
            }
        )
    })
},

exports.deleteCustomer = (username) => {
    let query = `DELETE from customers WHERE username = '${username}'`
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


