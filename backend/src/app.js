const express = require('express');
const routes = require('./routes')
const multer = require('multer')
const passport = require('passport');
const session = require('express-session')
const app = express();


app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.set(multer);
app.set('port', (process.env.PORT || 3000));
app.use(express.json());
app.use(routes);

module.exports = app;