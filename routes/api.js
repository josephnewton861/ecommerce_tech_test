const apiRouter = require("express").Router();

apiRouter.get("/", (req, res, next) => res.send({ msg: 'here in get route' }));

module.exports = apiRouter;