const express = require("express");
const app = express();
const apiRouter = require("./routes/api");
const {con, host} = require('../db/connection');

app.use(express.json());

app.use("/api", apiRouter);

const port = process.env.PORT || 3000;


app.listen(port);

app.get('/', (req, res) => {
    let testQuery = `SELECT * FROM ${host}.PRODUCTS ORDER BY release_date desc;`
    return new Promise((resolve, reject) => {
        con.query(
            testQuery, (err, result)  => {
                if (err) {
                    return reject({
                        status: 500,
                        msg: `Unable to get products`
                    })
                }
                console.log(result, 'here')
                return resolve({products: result});
            }
        )
    }).then((products) => {
        res.status.send(products);
    })
  })
module.exports = app;