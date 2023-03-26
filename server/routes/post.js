const router = require('express').Router();
const { post, getPost, deletePost, like, reply, retweet, bookmark} = require('../controllers/postControllers');

router.post('/post', post);
router.delete('/delete/:postId', deletePost);
router.post('/get', getPost);

router.post('/like', like);
router.post('/reply', reply);
router.post('/retweet', retweet);

router.post('/bookmark', bookmark);

module.exports = router;