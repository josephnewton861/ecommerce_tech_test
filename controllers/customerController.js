const {
    fetchCustomerIfLoggedIn,
    updateCustomer,
    deleteCustomer,
    insertCustomer,
    updateCustomersStatus
} = require('../models/customer');

let emailValidator = require('email-validator')
let passwordValidator = require('password-validator');
let passwordSchema = new passwordValidator();

const validatePassword = (password) => {
    passwordSchema.is()
    .min(8)
    .max(16)
    .has().uppercase()
    .has().lowercase()
    .has().symbols(1)
    .has().not().spaces();
    return passwordSchema.validate(password, {list: true});
}

exports.isCustomerLoggedIn = (req, res, next) => {
    const {username, password, email} = req.body;
    let emailCheck = emailValidator.validate(email);
    let passwordCheck = validatePassword(password);

    if (emailCheck && !passwordCheck.length) {
        fetchCustomerIfLoggedIn(username, password, email)
        .then((customer) => {
            return res.status(200).send({customer})
        })
        .catch(next)
    } else {
        return res.status(400).send({email: email, passwordCheck: passwordCheck, msg: 'bad request'})
    }
},

exports.updateUsersStatus = (req, res, next) => {
    const {username, status} = req.body;

    updateCustomersStatus(username, status)
    .then((customer) => {
        return res.status(200).send(customer)
    }).catch((err) => {
        return res.status(400).send(err.msg);
    })
},

exports.addCustomer = (req, res, next) => {
    const {username, password, address, email, postcode} = req.body;

    let emailCheck = emailValidator.validate(email);
    let passwordCheck = validatePassword(password);

    if (emailCheck && !passwordCheck.length) {
        insertCustomer(username, password, address, email, address, postcode)
        .then((customer) => {
            return res.status(200).send(customer)
        }).catch((err) => {
            return res.status(404).send(err);
        })
    } else {
        return res.status(400).send({email: email, passwordCheck: passwordCheck})
    }
},

exports.removeCustomer = (req, res, next) => {
    const {username} = req.params;
    deleteCustomer(username)
    .then((customer) => {
        res.status(200).send(customer.msg)
    }).catch((err) => {
        return res.status(400).send({msg: 'Unable to delete user'})
    })
},

exports.updateCustomerCredentials = (req, res, next) => {
    const {address, postcode} = req.body;
    const {username} = req.params;
    updateCustomer(address, postcode, username)
    .then((customer) => {
        res.status(200).send(customer.msg)
    }).catch((err) => {
        return res.status(404).send({msg: 'Unable to update users details'})
    })
}

// exports.signOut = (req, res, next) => {
//     const {username} = req.body;
//     updateCustomerSignOut(address, postcode, username)
//     .then((customer) => {
//         res.status(200).send(customer.msg)
//     }).catch((err) => {
//         return res.status(400).send({msg: 'Unable to update users details'})
//     })
// }