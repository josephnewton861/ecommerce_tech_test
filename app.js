const express = require("express");
const app = express();
const apiRouter = require("./routes/api");

app.use(express.json());

app.use("/api", apiRouter);

module.exports = app;



// get all data from db

// post new users to db

// update users

// Update product stock number

// post orders