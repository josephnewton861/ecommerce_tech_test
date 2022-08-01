const customerRouter = require('express').Router();

const {
    isCustomerLoggedIn,
    addCustomer,
    removeCustomer,
    updateCustomerCredentials,
    updateUsersStatus
} = require ('../controllers/customerController')
customerRouter
    .route('/')
    .post(addCustomer)
    .patch(updateUsersStatus)

customerRouter
    .route('/:username')
    .patch(updateCustomerCredentials)
    .delete(removeCustomer)
    .post(isCustomerLoggedIn)

module.exports = customerRouter;