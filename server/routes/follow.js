const router = require('express').Router();
const jwtAuth = require('../middleware/jwtAuth');
const { follow, getFollowedUsers } = require('../controllers/followControllers');

router.post('/follow', jwtAuth, follow);
router.get('/followedUsers/:userId', jwtAuth, getFollowedUsers);

module.exports = router;
