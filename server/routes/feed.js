const router = require('express').Router();
const jwtAuth = require('../middleware/jwtAuth');
const { getFeed } = require('../controllers/feedControllers');

router.get('/:userId', jwtAuth, getFeed);

module.exports = router;