var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../model/user');
var Verify = require('./verify');
/* GET users listing. */
router.get('/', Verify.verifyAdminUser, function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
});

/**
 * Register users here 
 */
router.post('/register', function(req, res, next) {
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({ err: err });
        }

        passport.authenticate('local')(req, res, function() {
            return res.status(200).json({ status: "User successfully registered !" });
        });
    });
});


/**
 * Try to login users here 
 */
router.post('/login', function(req, res, next) {
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ status: "User not found" });
        }

        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({ status: "Could not log in user" });
            }

            var token = Verify.getToken(user);
            res.status(200).json({ status: "Login successful", sucess: true, token: token });
        });
    });
});

/**
 * Log out the fucking user
 */
router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({ status: 'Logged out!' });
});
module.exports = router;