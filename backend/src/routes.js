const express = require('express');
const multer = require('multer');
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const routes = express.Router();
const path = require('path');
const passport = require('passport');
require('./passport-config')(passport, sessionController.getUserByEmail, sessionController.getUserById);

var storage = multer.diskStorage({
    destination: function(request, file, callback) {
        callback(null, './assets/images');
    },
    filename: function(request, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
})

var fileFilter = function(request, file, callback) {
    if (file.mimetype != 'image/png') {
        callback(new Error('File format should be PNG', false));
    }
    callback(null, true);
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

routes.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err); 
        if (!user) return res.status(401).json({ msgError: 'Email or password invalid' });
       
        req.login(user, function(err) {
            if (err) return next(err);
            return res.status(200).json(user);
        });

    })(req, res, next);
});

routes.get('/authenticated', userController.validateIsAuthenticated);

routes.post('/users', upload.single('avatar'), userController.create);

routes.get('/users/:id', userController.getUserById);

module.exports = routes;