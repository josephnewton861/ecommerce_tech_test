const customerRouter = require('express').Router();

const {
    isCustomerLoggedIn,
    addCustomer,
    removeCustomer,
    updateCustomerCredentials
} = require ('../controllers/customerController')
customerRouter
    .route('/')
    .get(isCustomerLoggedIn)
    .patch(updateCustomerCredentials)
    .delete(removeCustomer)
    .post(addCustomer)

module.exports = customerRouter;