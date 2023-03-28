const router = require('express').Router();
const { stripe } = require('../controllers/stripeControllers');

router.post('/checkout', stripe);

module.exports = router;
