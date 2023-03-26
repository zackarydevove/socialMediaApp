const router = require('express').Router();
const { getFeed } = require('../controllers/feedControllers');

router.get('/:userId', getFeed);

module.exports = router;