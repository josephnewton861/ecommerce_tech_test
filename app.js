const express = require("express");
const app = express();
const apiRouter = require("./routes/api");

app.use(express.json());

app.use("/api", apiRouter);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('hello world')
  })

app.listen(port);

module.exports = app;