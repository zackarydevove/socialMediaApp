const router = require('express').Router();
const { root, login, logout, register, googleAuth, googleCallback, getUser, getProfile, getCreator, getRandom } = require("../controllers/authControllers");

router.get('/', root);

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);

router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleCallback);

router.get('/user', getUser);
router.get('/user/profile/:username', getProfile)
router.get('/user/creator/:creatorId', getCreator);

router.get('/user/random', getRandom);

module.exports = router;