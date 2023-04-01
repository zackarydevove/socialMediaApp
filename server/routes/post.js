const router = require('express').Router();
const jwtAuth = require('../middleware/jwtAuth');
const { post, getPost, deletePost, like, reply, retweet, bookmark} = require('../controllers/postControllers');

router.post('/post', jwtAuth, post);
router.delete('/delete/:postId', jwtAuth, deletePost);
router.post('/get', jwtAuth, getPost);

router.post('/like', jwtAuth, like);
router.post('/reply', jwtAuth, reply);
router.post('/retweet', jwtAuth, retweet);

router.post('/bookmark', jwtAuth, bookmark);

module.exports = router;