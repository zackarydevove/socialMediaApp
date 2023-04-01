const router = require('express').Router();
const jwtAuth = require('../middleware/jwtAuth');
const { searchUsers } = require ('../controllers/searchControllers');

router.get('/users/:query', jwtAuth, searchUsers);

module.exports = router;
