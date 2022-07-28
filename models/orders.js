const {con, host} = require('../db/connection');

exports.fetchAllOrders = (customer_id) => {
    let query = `SELECT orders.id, orders.product_id, orders.status, orders.chosen_size, products.name, 
    products.style, products.gender, products.category, orders.delivered_date, orders.issue_date,products.img, orders.customer_id
    FROM ${host}.orders 
    JOIN products ON products.id = orders.product_id 
    WHERE orders.customer_id = ${customer_id}
    ORDER BY orders.issue_date desc`

    return new Promise((resolve, reject) => {
        con.query(
            query, (err, result)  => {
                if (err || !result.length) {
                    return reject({
                        status: 404,
                        msg: `Unable to find orders`
                    })
                }
                return resolve({orders: result});
            }
        )
    })
}

exports.addOrders = (product_ids, sizes, customer_id) => {

    let date = new Date();
    let promiseArr = [];

    let formattedDate = formatDate(date);

    product_ids.forEach((id, index) => {
        let query = `INSERT into test.orders (customer_id, product_id, status, chosen_size, issue_date) 
        SELECT ${customer_id}, products.id, 0, ${sizes[index]}, '${formattedDate}' from test.products WHERE products.id = ${id}`;
        promiseArr.push(
            new Promise((resolve, reject) => {
            con.query(
                query, (err, result)  => {
                    if (err) {
                        return reject({
                            status: 400,
                            msg: `Unable to add order`
                        })
                    }
                    resolve({msg: 'Successful adding of order'});
                }
            )
        }))
    })
    return Promise.all(promiseArr);
}

const formatDate = (date) => {
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let year = date.getFullYear()
    let newDate = date.getDate();
    return `${year}-${month}-${newDate}`
}