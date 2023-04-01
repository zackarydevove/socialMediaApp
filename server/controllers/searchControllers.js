const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

module.exports.searchUsers = (req, res) => {
    const query = req.params.query;
  
    User.find({ username: new RegExp(query, 'i') })
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json({ error: 'Error searching for users' });
      });
  };