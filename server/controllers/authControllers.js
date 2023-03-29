const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const passport = require('passport');
const mongoose = require('mongoose');

const CLIENT_URL = process.env.CLIENT_URL;

module.exports.googleAuth = passport.authenticate('google', { scope: ['profile'] });

module.exports.googleCallback = passport.authenticate('google', { 
    failureRedirect: `${CLIENT_URL}/`, 
    successRedirect: `${CLIENT_URL}/home`
    });

module.exports.facebookAuth = passport.authenticate('facebook', { scope: ['profile'] });

module.exports.facebookCallback = passport.authenticate('facebook', {
    failureRedirect: `${CLIENT_URL}/`, 
    successRedirect: `${CLIENT_URL}/home`
    });

module.exports.register = (req, res) => {
    User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] })
    .then((user) => {
        if (user) {
            if (user.email === req.body.email && user.username === req.body.username) {
                console.log('Email and username already used');
                res.send('Email and username already used');
            }
            else if (user.email === req.body.email) {
                console.log('Email already used')
                res.send('Email already used!');
            } else if (user.username === req.body.username) {
                console.log('Username already used');
                res.send('Username already used');
            }
        } else {
            if (req.body.password === req.body.confirmPassword) {
                bcrypt.hash(req.body.password, 10)
                .then((hashedPassword) => {
                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: hashedPassword
                    })
                    newUser.save()
                    .then((response) => {
                        console.log('new user created:\n', response, '\n');
                        req.logIn(newUser, (err) => {
                            if (err) return (next(err));
                            res.send('User successfully created and authenticated');
                        })
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            } else {
                res.send('Password doesnt match');
            }
        }
    })
    .catch((err) => console.log(err));
};

module.exports.login = (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', (err, user, info) => {
        if (err) return (next(err));
        if (!user) {
            console.log('user not found');
            return (res.send('no user exists'))
        };
        req.logIn(user, (err) => {
            if (err) return (next(err));
            res.send('Successfully Authenticated');
            console.log(req.user);              
        })
    })(req,res,next);
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) console.log(err);
        else res.send('Logout successfully');
    });
};

// Check if user is authenticate, if not redirect him to /login
module.exports.root = (req, res) => {
    if (!req.user) {
        res.redirect(`${CLIENT_URL}/login`);
    }
};

// req.user contain all the data in of user in the cookie
module.exports.getUser = (req, res) => {
    res.send(req.user);
};

module.exports.getProfile = (req, res) => {
    User.findOne({username: req.params.username})
    .then((user) => {
        console.log('Profile sent\n');
        res.send(user);
    })
    .catch((err) => {
        res.send('user not found');
    })
};

module.exports.getCreator = (req, res) => {
    console.log(req.params.creatorId);
    User.findOne({_id: req.params.creatorId})
    .then((user) => {
        console.log('Creator sent\n');
        res.send(user);
    })
    .catch((err) => {
        res.send('user not found');
    })
}

module.exports.getRandom = (req, res) => {
    const currentUserId = new mongoose.Types.ObjectId(req.user._id); // Convert the current user's _id to an ObjectId

    User.aggregate([
        { $match: { _id: { $ne: currentUserId } } }, // Exclude the current user
        { $sample: { size: 3 } },
    ])
    .then((users) => {
        res.status(200).json(users);
    })
    .catch((err) => {
        res.status(400).json("Error: " + err);
    });
};