const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const CLIENT_URL = process.env.CLIENT_URL;

// module.exports.googleAuth = passport.authenticate('google', { scope: ['profile'] });

// module.exports.googleCallback = passport.authenticate('google', { 
//     failureRedirect: `${CLIENT_URL}/`, 
//     successRedirect: `${CLIENT_URL}/home`
//     });

// module.exports.facebookAuth = passport.authenticate('facebook', { scope: ['profile'] });

// module.exports.facebookCallback = passport.authenticate('facebook', {
//     failureRedirect: `${CLIENT_URL}/`, 
//     successRedirect: `${CLIENT_URL}/home`
//     });

module.exports.register = (req, res) => {
    User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] })
    .then((user) => {
        if (user) {
            if (user.email === req.body.email && user.username === req.body.username) {
                console.log('Email and username already used');
                res.json({message: 'Email and username already used'});
            }
            else if (user.email === req.body.email) {
                console.log('Email already used')
               res.json({message: 'Email already used!'});
            } else if (user.username === req.body.username) {
                console.log('Username already used');
               res.json({message: 'Username already used'});
            }
        } else {
            if (req.body.password === req.body.confirmPassword) {
                bcrypt.hash(req.body.password, 10)
                .then((hashedPassword) => {
                    const newUser = new User({
                        username: req.body.username,
                        twittername: req.body.username,
                        email: req.body.email,
                        password: hashedPassword
                    })
                    newUser.save()
                    .then((response) => {
                        console.log('new user created:\n', response, '\n');
                        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
                        res.status(200).json({ token: token, message: 'User successfully created and authenticated' });
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            } else {
                res.status(401).json({message: 'Password doesnt match'});
            }
        }
    })
    .catch((err) => console.log(err));
};

module.exports.login = (req, res, next) => {
    console.log(req.body);
    User.findOne({ $or: [{ email: req.body.usernameOrEmail }, { username: req.body.usernameOrEmail }] })
      .then(user => {
        if (!user) {
            console.log('User not found')
            return res.status(401).json({ message: 'Authentication failed' });
        }
        console.log('User found:', user);
        bcrypt.compare(req.body.password, user.password)
          .then(isMatch => {
            if (isMatch) {
                console.log(user, 'Successfully Authenticated')
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
                res.status(200).json({ token: token, message: 'Successfully Authenticated' });
            } else {
                console.log('Wrong password')
                res.status(401).send('Authentication failed');
            }
          });
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal server error' });
      });
}

// module.exports.logout = (req, res) => {
//     req.logout((err) => {
//         if (err) console.log(err);
//         else res.send('Logout successfully');
//     });
// };

// Check if user is authenticate, if not redirect him to /login
module.exports.root = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    if (!userId) {
        res.redirect(`${CLIENT_URL}/login`);
    }
};


module.exports.getUser = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
  
    console.log('id in getUser:', userId);
    User.findById(userId)
      .then((user) => {
        if (!user) {
            res.status(401).send('User not found');
        } else {
            console.log('user in getUser:', user)
            res.send(user);
        }
        })
      .catch((err) => {
            console.log(err);
            res.status(500).send('Internal server error');
        });
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

// Get 3 random users to follow
module.exports.getRandom = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const currentUserId = new mongoose.Types.ObjectId(userId);

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