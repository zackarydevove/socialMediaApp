const router = require('express').Router();
const { createChat, getChats, getParticipants,sendMessage, getMessages, lastMessage } = require('../controllers/chatControllers')

router.post('/', createChat);
router.get('/:userId', getChats);
router.get('/participants/:chatId', getParticipants);
router.post('/:chatId/message', sendMessage);
router.get('/:chatId/messages/:page', getMessages);
router.get('/:chatId/lastmessage', lastMessage);

module.exports = router;