const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const eventRoutes = require('./app/routes/event');
const mongoose = require("./app/config/database");

// Database
mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/event", eventRoutes);


app.get('/', function (req, res) {
    res.json({ "API: ": "this is event management" });
});
app.listen(3000, function () { console.log('Node server listening on port 3000'); });
