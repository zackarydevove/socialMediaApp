const router = require('express').Router();
const jwtAuth = require('../middleware/jwtAuth');
const { stripe } = require('../controllers/stripeControllers');

router.post('/checkout', jwtAuth, stripe);

module.exports = router;
