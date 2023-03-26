const router = require('express').Router();
const { searchUsers } = require ('../controllers/searchControllers');

router.get('/users/:query',searchUsers);

module.exports = router;
