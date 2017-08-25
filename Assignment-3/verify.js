var User = require('../model/user');
var jwt = require('json-web-token');
var config = require('../config');
/**
 * Get the token
 */
exports.getToken = function(user) {
    return jwt.sign(user, config.secretkey, { expiresIN: 3600 });
}

/**
 * Verify token for incoming requests (only Ordinary users)
 */

exports.verifyOrdinaryUser = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-acess-token'];
    if (token) {
        jwt.verify(token, config.secretkey, function(err, decodedToken) {
            if (err) {
                var e = new Error("You are not authenticated");
                e.status(403);
                next(err);
            } else {
                req.decoded = decodedToken;
                next();
            }
        })
    } else {
        var err = new Error("No token provided");
        err.staus = 403;
        next(err);
    }
}

/**
 * Admin users
 */
exports.verifyAdminUser = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-acess-token'];
    if (token) {
        jwt.verify(token, config.secretkey, function(err, decodedToken) {
            if (err) {
                var e = new Error("You are not authenticated");
                e.status(403);
                next(e);
            } else {
                req.decoded = decodedToken;
                //check for admin previliges
                if (req.decoded._doc.admin) {
                    next();
                } else {
                    var err = new Error("Not an admin and not authorized to perform this action");
                    err.staus = 403;
                    next(err);
                }
            }
        });
    } else {
        var err = new Error("No token provided");
        err.staus = 403;
        next(err);
    }
}