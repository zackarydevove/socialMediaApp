const router = require('express').Router();
const jwtAuth = require('../middleware/jwtAuth');
const { updateProfile, updateSettings, updatePassword, resetNotificationCount } = require('../controllers/userControllers');

router.put('/profile/update/:id', jwtAuth, updateProfile);
router.put('/setting/update/', jwtAuth, updateSettings);
router.put('/password/update', jwtAuth, updatePassword);
router.put('/notification/update', jwtAuth, resetNotificationCount)

module.exports = router;
