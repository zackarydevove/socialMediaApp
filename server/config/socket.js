const socketIO = require('socket.io');
const Message = require('../models/MessageModel');
const Chat = require('../models/ChatModel');
const User = require('../models/UserModel');
const Post = require('../models/PostModel');

const configureSockets = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id, '\n');

    socket.on('join_room', (chatId) => {
      socket.join(chatId);
      console.log(`Socket ${socket.id} joined room ${chatId}`);
    });

    socket.on('join_notification', (userId) => {
      socket.join(userId);
      console.log(`Socket ${socket.id} joined notification ${userId}`)
    })

    socket.on('send_message', (data) => {
        const newMessage = new Message({
            conversationId: data.chatId,
            content: data.message.content,
            sender: data.message.sender,
            receiver: data.message.receiver,
            timestamp: new Date(),
          });
          newMessage.save()
          .then((message) => {
              Chat.findByIdAndUpdate(data.chatId, { lastMessage: message._id })
              .then(() => {
                console.log('message sent:', message, '\n');
                io.to(data.chatId).emit('receive_message', message);
              })
              .catch((err) => console.log(err));
            })
          .catch((err) => console.log(err));
      });

    // Delete a message in a chat
    socket.on('delete_message', (data) => {
      const { messageId, chatId } = data;
      Message.findByIdAndRemove(messageId)
      .then((msg) => {
        console.log(msg, 'Message deleted')
        io.to(chatId).emit('message_deleted', messageId);
      })
      .catch((err) => {
        console.log(err, 'An error occured trying to delete a message');
      });
    })

    socket.on('quit_chat', (data) => {
      const {chatId, userId} = data;
      console.log('chatId in quit chat:', chatId);
      Chat.findById(chatId)
        .then((chat) => {
          chat.participants = chat.participants.filter((participantId) => participantId.toString() !== userId);
          
          // Remove chatId from the leaving user's chat list
          User.findById(userId)
            .then((user) => {
              user.chat = user.chat.filter((UserChatId) => UserChatId.toString() !==  chatId );
              user.save()
                .then((savedUser) => {
                  console.log('user', userId, 'quit successfully chat', chatId);
                  socket.to(chatId).emit('quit_chat', {chatId, userId});
                })
                .catch((err) => {
                  console.log(err, 'error while saving user');
                })
            })
            .catch((err) => {
              console.log(err, 'User not found');
            });

          // If 1 user left in chat, delete chat
          if (chat.participants.length === 1) {
            const lastParticipantId = chat.participants[0];

            // Delete all messages of the chat
            Message.deleteMany({conversationId: chatId})
            .then(() => console.log('All messages deleted for chat', chatId))
            .catch((err) => console.log('Error while deleting messages:', err));

            // Delete Chat
            chat.deleteOne()
              .then(() => {
                console.log('Chat removed');
                socket.to(chatId).emit('chat_deleted', {chatId});
              })
              .catch((err) => console.log(err, 'Error while removing chat'));

            // Delete chatId from last user
            User.findById(lastParticipantId)
              .then((user) => {
                user.chat = user.chat.filter((UserChatId) => UserChatId.toString() !==  chatId );
                user.save()
                  .then(() => console.log('Updated last user'))
                  .catch((err) => console.log(err, 'Error while saving user'));
              })
              .catch((err) => console.log(err, 'User not found'));
          } else {
            chat.save()
              .catch((err) => {
                console.log(err, 'Error while saving chat');
              });
          }
        })
        .catch((err) => {
          console.log(err, 'Chat not found');
        })
    });

    socket.on('invite_users', (data) => {
      const {chatId, userIds} = data;

      console.log('chatId:', chatId);
      console.log('userIds:', userIds);
      
      // Add users to the chat participants array
      Chat.findById(chatId)
      .then((chat) => {
        if (!chat) {
          console.log('Chat not found');
          return res.status(400).send('chat not found');
        }
        chat.participants.push(...userIds);
        chat.save()
        .then(() => {
          // Add chatId to each user's chat array
          const userUpdatePromises = userIds.map((userId) =>
            User.findByIdAndUpdate(
              userId,
              { $push: { chat: chatId } },
              { new: true }
            ).exec()
          );
          Promise.all(userUpdatePromises)
            .then(() => {
              console.log(`Users ${userIds.join(', ')} joined chat ${chatId} successfully.`);
              socket.to(chatId).emit('joined_chat', { chatId, userIds });
            })
            .catch((err) => {
              console.log('Error while updating users with new chat', err);
            });
        })
        .catch((err) => {
          console.log('Error while saving updated chat', err);
        })
      })
      .catch((err) => {
        console.log('Chat not found', err);
      })
    })

    socket.on('typing_start', ({ chatId, username }) => {
      socket.to(chatId).emit('typing_start', username);
    });
      
    socket.on('typing_stop', ({ chatId, username }) => {
      socket.to(chatId).emit('typing_stop', username);
    });
 
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });

  });

  return io;
};

module.exports = configureSockets;