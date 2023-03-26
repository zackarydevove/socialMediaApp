const router = require('express').Router();
const { createChat, getChats, getParticipant,sendMessage, getMessages } = require('../controllers/chatControllers')

router.post('/', createChat);
router.get('/:userId', getChats);
router.get('/participant/:chatId', getParticipant);
router.post('/:chatId/message', sendMessage);
router.get('/:chatId/messages', getMessages);

module.exports = router;