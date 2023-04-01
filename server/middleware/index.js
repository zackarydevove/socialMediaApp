const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const CLIENT_URL = process.env.CLIENT_URL;

const configureMiddleware = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: CLIENT_URL,
      credentials: true,
    })
  );
  app.use(cookieParser(process.env.SESSION_SECRET));
};

module.exports = configureMiddleware;