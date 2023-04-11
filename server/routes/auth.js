const router = require('express').Router();
const jwtAuth = require('../middleware/jwtAuth');
const { root, login, logout, register, googleAuth, googleCallback, facebookAuth, facebookCallback ,getUser, getProfile, getCreator, getRandom } = require("../controllers/authControllers");

router.get('/', root);

router.post('/login', login);
router.post('/register', register);

router.get('/user', jwtAuth, getUser);
router.get('/user/profile/:username', jwtAuth, getProfile)
router.get('/user/creator/:creatorId', jwtAuth, getCreator);

router.get('/user/random', jwtAuth, getRandom);

module.exports = router;