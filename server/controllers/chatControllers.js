const Chat = require('../models/ChatModel');
const Message = require('../models/MessageModel');
const User = require('../models/UserModel');

// Create a new Chat and save the chatId in each participants chat
module.exports.createChat = (req, res) => {
  const participants = req.body.participants;

  const chat = new Chat({ participants });

  chat.save()
  .then((chat) => {
      // Update participants' chat arrays with the new chat's ID
      const chatId = chat._id;
      const updateUserChatsPromises = participants.map((userId) =>
      User.findByIdAndUpdate(
        userId,
        { $push: { chat: chatId } },
        { new: true, useFindAndModify: false }
      )
    );
    return Promise.all(updateUserChatsPromises).then(() => chat);
  })
  .then((chat) => {
    res.status(201).json(chat);
    console.log('Chat successfully created');
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ error: "Error creating chat" });
  });
};

// Get all chatsIds of user (for chat dashboard)
module.exports.getChats = (req, res) => {
    const userId = req.params.userId;
  
    User.findById(userId)
      .populate('chat')
      .then(user => {
        res.status(200).json(user.chat);
      })
      .catch(err => {
        res.status(500).json({ error: 'Error fetching chats' });
      });
};

// Get data of the other participant in a chat
module.exports.getParticipant = (req, res) => {
  const chatId = req.params.chatId;
  const currentUserId = req.user._id;

  // Find the chat by chatId
  Chat.findById(chatId)
  .then((chat) => {
    if (!chat) {
      res.status(404).json({ error: 'Chat not found.' });
      return;
    }
    // Find the other participant's ID
    const otherUserId = chat.participants.find((participant) => participant.toString() !== currentUserId.toString());
    if (!otherUserId) {
      res.status(404).json({ error: 'Other participant not found.' });
      return;
    }
    // Fetch the other participant
    User.findById(otherUserId)
    .then((otherUser) => {
      console.log('Other participant is:', otherUser, '\n');
      res.status(200).json(otherUser);
    })
    .catch((err) => {
      res.status(500).json({ error: 'An error occurred while finding the other participant.' });
    })
  })
  .catch((err) => {
    res.status(500).json({ error: 'An error occurred while finding the chat.' });
  })
}

// Send a message in a chat
module.exports.sendMessage = (req, res) => {
    const chatId = req.params.chatId;
    const { content, sender, receiver } = req.body;
  
    const message = new Message({
      conversationId: chatId,
      content: content,
      sender: sender,
      receiver: receiver,
    });
  
    message.save()
      .then(message => {
        res.status(201).json(message);
      })
      .catch(err => {
        res.status(500).json({ error: 'Error sending message' });
      });
};

// Get messages in a chat (in most recent order)
module.exports.getMessages = (req, res) => {
    const chatId = req.params.chatId;
  
    Message.find({ conversationId: chatId })
      .sort('-timestamp')
      .then(messages => {
        res.status(200).json(messages);
      })
      .catch(err => {
        res.status(500).json({ error: 'Error fetching messages' });
      });
};
