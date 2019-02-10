const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const makeconnection = require('./constants/db/connection');
const users = require('./routes/user/user');

const app = express();
const PORT = process.env.PORT || 5000;


makeconnection();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./strategy/jwt/passport')(passport);

app.use('/api/users', users);

app.get('/', async (req, res) => {
    res.send('API works!');
});

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});

