const express = require("express");
const app = express();
const apiRouter = require("./routes/api");
const cors = require('cors')

app.use(express.json());

app.use(cors());

app.use("/api", apiRouter);

module.exports = app;