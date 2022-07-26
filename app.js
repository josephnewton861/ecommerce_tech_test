const express = require("express");
const app = express();
const apiRouter = require("./routes/api");
const sqlInjection = require('sql-injection')

app.use(express.json());

// app.configure(function() {
//     app.use(sqlInjection)
// });

app.use("/api", apiRouter);

module.exports = app;



// get all data from db

// post new users to db

// update users

// Update product stock number

// post orders