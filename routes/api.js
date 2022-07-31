const apiRouter = require("express").Router();
const customerRouter = require('./customer');
const productsRouter = require('./products');
const ordersRouter = require('./orders');

apiRouter.get("/", (req, res, next) => res.send({ msg: 'here in get route' }));

apiRouter.use('/customer', customerRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/orders', ordersRouter);

module.exports = apiRouter;