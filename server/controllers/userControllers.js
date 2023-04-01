const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.updateProfile = (req, res) => {
    const { id } = req.params;
    const { twitterName, description, link } = req.body;
  
    User.findByIdAndUpdate(id, {
        twittername: twitterName,
        description: description,
        link: link,
      }, { new: true })
    .then((updatedUser) => {
        console.log(updatedUser, 'User updated successfully\n');
        res.status(200).send('User updated successfully');
    })
    .catch((err) => {
        console.log(err, 'Error user while updating user profile\n')
        res.status(500).send(err);
    })
};

module.exports.updateSettings = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // assuming token is in the format "Bearer <token>"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const userEmail = decoded.email;
    const userUsername = decoded.username;

    const { username, phone, email, country, age } = req.body;

    User.findOne({ $or: [{ username: username }, { email: email }] })
    .then((user) => {
        if (user && userId !== user._id && user.username === userUsername) {
            console.log('username already taken');
            return res.send('username taken');
        }
        else if (user && userId !== user._id && user.email === userEmail) {
            console.log('email already taken');
            return res.send('email taken');
        }
        User.findByIdAndUpdate(userId, {
            username: username,
            phone: phone,
            email: email,
            country: country,
            age: age 
          }, { new: true })
        .then((updatedUser) => {
            console.log(updatedUser, 'User updated successfully\n');
            res.status(200).send('User updated successfully');
        })
        .catch((err) => {
            console.log(err, 'Error user while updating user profile\n')
            res.status(500).send(err);
        })
    })
    .catch((err) => {
        console.log(err, 'error while searching for existing username/email');
        return res.send('error while searching for existing username/email');
    })

};

module.exports.updatePassword = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // assuming token is in the format "Bearer <token>"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const userEmail = decoded.email;

    if (userEmail === 'demo') {
        console.log('cant update demo')
        return res.send('cant update demo');
    }
    User.findById(userId)
    .then((user) => {
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const {currentPassword, newPassword} = req.body;

        bcrypt.compare(currentPassword, user.password)
        .then((match) => {
            if (!match) {
                console.log('incorrect current password');
                return res.send('Incorrect current password');
            }
            // Hash the new password
            bcrypt.hash(req.body.newPassword, 10)
            .then((hashedPassword) => {
                // Update the user's password
                user.password = hashedPassword;
                user.save()
                .then((updatedUser) => {
                    console.log(user, 'Password changed successfully\n')
                    res.status(200).send('Password updated successfully');
                })
                .catch((err) => {
                    console.log(err, 'Error user while updating user password\n')
                    res.status(500).send(err);
                })
            })
            .catch((err) => {
                console.log(err, 'Error while hashing password\n')
                res.status(500).send(err);
            })
        })
        .catch((err) => {
            console.log(err, 'Error while checking password\n')
            res.status(500).send(err);
        })
    })
    .catch((err) =>{
        console.log(err, 'Error while searching user\n')
        res.status(500).send(err);
    })
};

module.exports.resetNotificationCount = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // assuming token is in the format "Bearer <token>"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    User.findByIdAndUpdate(userId, {
        notificationCount: 0,
    })
    .then((user) => {
        console.log('Updated user notification count sent');
        res.send(user);
    })
    .catch((err) => console.log(err));
}