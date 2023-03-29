const express = require('express')
const configureMiddleware = require('./middleware');
const connectToDatabase = require('./config/database');
const configureSockets = require('./config/socket');
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const followRoutes = require('./routes/follow');
const feedRoutes = require('./routes/feed');
const chatRoutes = require('./routes/chat');
const searchRoutes = require('./routes/search');
const stripeRoutes = require('./routes/stripe');
const userRoutes = require('./routes/user');

const app = express();

const server = require('http').createServer(app);
const io = configureSockets(server);

connectToDatabase();
configureMiddleware(app);

app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/user', userRoutes);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });