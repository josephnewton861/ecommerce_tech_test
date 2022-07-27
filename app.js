const express = require("express");
const app = express();
const apiRouter = require("./routes/api");

const { 
    handles400s,
    handles500s,
    handles404s,
    handles405s
} = require('./error_handling/error')


app.use(express.json());

app.all('/*', (req, res, next) => {
    res.status(404).send({msg: 'Path not found'})
});

app.use("/api", apiRouter);

app.use(handles400s);
app.use(handles500s);
app.use(handles404s);
app.use(handles405s)

module.exports = app;