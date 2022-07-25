const {
    fetchCustomerIfLoggedIn,
    updateCustomer,
    deleteCustomer,
    insertCustomer
} = require('../models/customer');

exports.isCustomerLoggedIn = (req, res, next) => {
    const {username, password, email} = req.params;
    fetchCustomerIfLoggedIn(username, password, email)
    .then((customer) => {
        res.status(200).send({customer})
    }).catch(({msg}) => {
        res.status.send(msg);
    })
}

exports.addCustomer = (req, res, next) => {
    const {username, password, address, email, postcode} = req.params;
    insertCustomer(username, password, address, email, address, postcode)
    .then((res) => {
        res.status(200).send({customer})
    }).catch(({msg}) => {
        console.log('back in response')
        res.status(404).send(msg)
    })
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