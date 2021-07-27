//jshint esversion:6
const passport = require("passport");

const User = require("../models/user");
const logger = require("../Utils/logger");

exports.login = async (req, res) => {
    passport.authenticate(
        "local"
    )(req, res, () => {
        if (req.user) {
            res.json({
                username: req.user.username,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
            });
        } else {
            next("some Error occured!");
        }
    });
};

exports.register = (req, res, next) => {
    User.register(
        {
            username: req.body.username,
            // email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        },
        req.body.password,
        (err, user) => {
            if (err) {
                logger.logError(err);
                res.status(400).json(err.message?err.message:"Error");
                
            } else {
                passport.authenticate("local"
                )(req, res, () => {
                    if (req.user) {
                        res.json({
                            username: req.user.username,
                            // email: req.user.email,
                            firstName: req.user.firstName,
                            lastName: req.user.lastName,
                            // user: req.user,
                        });
                    } else {
                        next("some Error occured!");
                    }
                });
            }
        }
    );
};

exports.logout = (req, res) => {
    req.logout();
    res.json("Logout Successful");
};

exports.getUser = (req, res) => {
    if (req.user)
        res.json({
            username: req.user.username,
            // email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            // user: req.user,
        });
    else res.status(401).json("unauth");
};

exports.check_auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.json("User not authenticated");
    }
};

exports.check_not_auth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.json({
            username: req.user.username,
            // email: req.user.email,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            // user: req.user,
        });
    }
};
