const socketIO = require('socket.io');
const Message = require('../models/MessageModel');

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
            io.to(data.chatId).emit('receive_message', message);
            console.log('message sent:', message, '\n');
          })
          .catch((err) => console.log(err));
      });

    socket.on('typing_start', (chatId) => {
      socket.to(chatId).emit('typing_start', socket.id);
    });
      
    socket.on('typing_stop', (chatId) => {
      socket.to(chatId).emit('typing_stop', socket.id);
    });
 
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

module.exports = configureSockets;