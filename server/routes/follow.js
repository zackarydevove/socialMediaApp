const router = require('express').Router();
const { follow, getFollowedUsers } = require('../controllers/followControllers');

router.post('/follow', follow);
router.get('/followedUsers/:userId', getFollowedUsers);

module.exports = router;
