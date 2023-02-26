const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db_config = require('./config/database');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

const dbURI = db_config.database;
mongoose.connect(dbURI, {}, (err) => {
    if (err) throw err;
});
mongoose.connection.on('connected', () => {
    console.log("Connected to database " + dbURI);
});
mongoose.connection.on('error', (err) => {
    console.log("Database Error" + err);
});

app.use('/user', require('./routes/user'));

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));