const express = require("express");
const app = express();

app.use(require('body-parser').json());
app.use(logger);

app.use("/api", require("./router"));

function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
};

app.listen(5000);
