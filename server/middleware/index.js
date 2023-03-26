const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const setupPassport = require('./passportConfig');

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

  setupPassport(app);
};

module.exports = configureMiddleware;