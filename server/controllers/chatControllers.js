const Chat = require('../models/ChatModel');
const Message = require('../models/MessageModel');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

// Create a new Chat and save the chatId in each participants chat
module.exports.createChat = (req, res) => {
  const participants = req.body.participants;
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;

  // If there is already a chat where there is all the participants, redirect them
  Chat.findOne({ participants: { $all: participants } })
    .then(existingChat => {
      if (existingChat && existingChat.participants.length === participants.length) {
        return res.status(400).send(existingChat);
      }
      
      const chat = new Chat({ participants });

      chat.save()
        .then((chat) => {
          // Update participants' chat arrays with the new chat's ID
          const chatId = chat._id;
          const updateUserChatsPromises = participants.map((participantId) =>
            User.findByIdAndUpdate(
              participantId,
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
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error finding chat" });
    });
};

// Get all chatsIds of user (for chat dashboard)
module.exports.getChats = (req, res) => {
  // const userId = req.params.userId;
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;

  User.findById(userId)
    .populate('chat')
    .then((user) => {
      const chatIds = user.chat.map((chat) => chat._id);

      const lastMessagesPromises = chatIds.map((chatId) => {
        return new Promise((resolve, reject) => {
          Chat.findById(chatId)
            .then((chat) => {
              if (chat.lastMessage) {
                Message.findById(chat.lastMessage)
                  .then((lastMessage) => {
                    resolve({ chatId, lastMessage });
                  })
                  .catch((err) => reject(err));
              } else {
                resolve({ chatId, lastMessage: null });
              }
            })
            .catch((err) => reject(err));
        });
      });

      Promise.all(lastMessagesPromises)
        .then((chatMessages) => {
          chatMessages.sort((a, b) => {
            const timestampA = a.lastMessage ? a.lastMessage.timestamp : Number.MIN_SAFE_INTEGER;
            const timestampB = b.lastMessage ? b.lastMessage.timestamp : Number.MIN_SAFE_INTEGER;
            return timestampB - timestampA;
          });

          const sortedChatIds = chatMessages.map((chatMessage) => chatMessage.chatId);
          res.status(200).json(sortedChatIds);
        })
        .catch((err) => {
          console.log(err, 'error fetching last message');
          res.status(500).json({ err: 'Error fetching chats' });
        });
    })
    .catch((err) => {
      res.status(500).json({ err: 'Error fetching user' });
    });
};

// Get data of the other participant in a chat
module.exports.getParticipants = (req, res) => {
  const chatId = req.params.chatId;
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentUserId = decoded.userId;

  // Find the chat by chatId
  Chat.findById(chatId)
  .then((chat) => {
    if (!chat) {
      res.status(404).json({ error: 'Chat not found.' });
      return;
    }
    // Find the other participants IDs
    const otherUsersId = chat.participants.filter(
      (participant) => participant.toString() !== currentUserId.toString());
    if (otherUsersId.length === 0) {
      res.status(404).json({ error: 'Other participants not found.' });
      return;
    }
    // Fetch the other participant
    User.find({ _id: { $in: otherUsersId } })
    .then((otherUsers) => {
      console.log('Other participants are:', otherUsers, '\n');
      res.status(200).json(otherUsers);
    })
    .catch((err) => {
      res.status(500).json({ error: 'An error occurred while finding the other participants.' });
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
        Chat.findByIdAndUpdate(chatId, { lastMessage: message._id })
        .then(() => {
          console.log('Message sent successfully');
          res.status(201).json(message);
        })
        .catch((err) => console.log(err));
      })
      .catch(err => {
        res.status(500).json({ error: 'Error sending message' });
      });
};

// Get messages in a chat (in most recent order)
module.exports.getMessages = (req, res) => {
  const {chatId, page} = req.params;
  const limit = 20;
  const skip = page * limit;

  Message.find({ conversationId: chatId })
    .sort('-timestamp')
    .skip(skip)
    .limit(limit)
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error fetching messages' });
    });
};

// Get last message sent in a chat
module.exports.lastMessage = (req, res) => {
  const { chatId } = req.params;
  Message.findOne({ conversationId: chatId })
  .sort({ timestamp: -1 })
  .exec()
  .then((message) => {
    res.json(message);
  })
  .catch((err) => console.log({error: 'Error fetching last message' }));
};