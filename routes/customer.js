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
    .get(isCustomerLoggedIn)
    .post(addCustomer)
    .patch(updateUsersStatus)

customerRouter
    .route('/:username')
    .patch(updateCustomerCredentials)
    .delete(removeCustomer)

module.exports = customerRouter;