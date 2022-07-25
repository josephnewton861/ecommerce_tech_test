const {con, host} = require('../db/connection');

exports.fetchCustomerIfLoggedIn = (username, password, email) => {
    //return [{customer: 'success'}]
    // console.log(host, con, 'host');

    let query = `select from ${host}.customers where username = 'test' or email = 'joe@test' and password = 123`

    con.query(
        query, (err, result, fields) => {
       if (err || !result.length) {
           console.log('here in model');
           return {
               status: 404,
               msg: `Username: ${username} / email: ${email} and or password: ${password} not found`
           }
       } 
       console.log(result, 'resultttttt')
        return result;
        }
    )
       //return propromis 
    //}
    //     (error, results) {
    //     console.log(error);
    //     }
    // );
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

