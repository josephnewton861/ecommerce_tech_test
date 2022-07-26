const {
    fetchCustomerIfLoggedIn,
    updateCustomer,
    deleteCustomer,
    insertCustomer
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
    const {username, password, email} = req.params;

    let emailCheck = emailValidator.validate(password);
    let passwordCheck = validatePassword(username);

    if (emailCheck && !passwordCheck.length) {
        fetchCustomerIfLoggedIn(username, password, email)
        .then((customer) => {
            return res.status(200).send({customer})
        }).catch((err) => {
            return res.status(404).send(err);
        })
    } else {
        return res.status(400).send({email: email, passwordCheck: passwordCheck, password: password})
    }
}

exports.addCustomer = (req, res, next) => {
    const {username, password, address, email, postcode, active} = req.params;

    let emailCheck = emailValidator.validate('joe@test.com');
    let passwordCheck = validatePassword('testt!');

    if (emailCheck && !passwordCheck.length) {
        insertCustomer(username, password, address, email, address, postcode, active)
        .then((customer) => {
            return res.status(200).send({customer})
        }).catch((err) => {
            return res.status(404).send(err);
        })
    } else {
        return res.status(400).send({email: email, passwordCheck: passwordCheck, password: password})
    }

    insertCustomer(username, password, address, email, address, postcode, active)
    .then((customer) => {
        res.status(200).send({customer})
    }).catch((err) => {
        console.log('back in response')
        res.status(404).send(err.msg)
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