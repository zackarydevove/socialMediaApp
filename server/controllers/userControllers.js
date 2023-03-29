const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

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
    const { username, phone, email, country, age } = req.body;

    User.findOne({ $or: [{ username: username }, { email: email }] })
    .then((user) => {
        if (user && user.username !== req.user.username) {
            console.log('username already taken');
            return res.send('username taken');
        }
        else if (user && user.email !== req.user.email) {
            console.log('email already taken');
            return res.send('email taken');
        }
    })
    .catch((err) => {
        console.log(err, 'error while searching for existing username/email');
        return res.send('error while searching for existing username/email');
    })

    User.findByIdAndUpdate(req.user._id, {
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
};

module.exports.updatePassword = (req, res) => {
    if (req.user.email === 'demo') {
        console.log('cant update demo')
        return res.send('cant update demo');
    }
    User.findById(req.user._id)
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
    User.findByIdAndUpdate(req.user._id, {
        notificationCount: 0,
    })
    .then((user) => {
        console.log('Updated user notification count sent');
        res.send(user);
    })
    .catch((err) => console.log(err));
}