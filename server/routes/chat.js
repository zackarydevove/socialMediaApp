const router = require('express').Router();
const jwtAuth = require('../middleware/jwtAuth');
const { createChat, getChats, getParticipants,sendMessage, getMessages, lastMessage } = require('../controllers/chatControllers')

router.post('/', jwtAuth, createChat);
router.get('/:userId', jwtAuth, getChats);
router.get('/participants/:chatId', jwtAuth, getParticipants);
router.post('/:chatId/message', jwtAuth, sendMessage);
router.get('/:chatId/messages/:page', jwtAuth, getMessages);
router.get('/:chatId/lastmessage', jwtAuth, lastMessage);

module.exports = router;