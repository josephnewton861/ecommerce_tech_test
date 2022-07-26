const {
    fetchAllOrders,
    addOrders
} = require('../models/orders')

exports.getAllOrders = (req, res, next) => {
    const {customer_id} = req.params;
    console.log(customer_id, 'id here')
    fetchAllOrders(customer_id)
        .then(({orders}) => {
            return res.status(200).send(orders)
        }).catch((err) => {
            return res.status(404).send(err);
    })
},

exports.postOrder = (req, res, next) => {
    const {product_ids, sizes} = req.body; 
    const {customer_id} = req.params;
    addOrders(product_ids, sizes, customer_id)
        .then((msg) => {
            return res.status(200).send(msg)
        }).catch((err) => {
            return res.status(404).send(err);
    })
}