const router = require('express').Router();
const { updateProfile, updateSettings, updatePassword, resetNotificationCount } = require('../controllers/userControllers');

router.put('/profile/update/:id', updateProfile);
router.put('/setting/update/', updateSettings);
router.put('/password/update', updatePassword);
router.put('/notification/update', resetNotificationCount)

module.exports = router;
