const {
    fetchCustomerIfLoggedIn,
    updateCustomer,
    deleteCustomer,
    insertCustomer
} = require('../models/customer');

exports.isCustomerLoggedIn = (req, res, next) => {
    const {username, password} = req.params;
    fetchCustomerIfLoggedIn(username, password)
    .then((res) => {
        res.status(200).send({customer})
    }).catch(next)
}

exports.addCustomer = (req, res, next) => {
    const {username, password, address, email, address, postcode} = req.params;
    insertCustomer(username, password, address, email, address, postcode)
    .then((res) => {
        res.status(200).send({customer})
    }).catch(next)
}

exports.removeCustomer = (req, res, next) => {
    const {username} = req.params;
    deleteCustomer(username)
    .then((res) => {
        res.status(200).send({customer})
    }).catch(next)
}

exports.updateCustomerCredentials = (req, res, next) => {
    const {address, postcode} = req.params;
    updateCustomer(address, postcode)
    .then((res) => {
        res.status(200).send({customer})
    }).catch(next)
}