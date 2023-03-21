const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express')
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const MongoStore = require('connect-mongo');
const CLIENT_URL = process.env.CLIENT_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL);

// Middleware

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ 
      mongoUrl: process.env.MONGODB_URL,
      collectionName: 'sessions',
      ttl: 3600,
      autoRemove: 'interval',
      autoRemoveInterval: 10
    })
}));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(passport.initialize());
app.use(passport.session());


// MongoDB

const userSchema = new mongoose.Schema({
    googleId: String,
    email: String,
    username: String,
    password: String,
    phone: String,
    country: String,
    birth: Date,
    age: Number,
    creation: Date,
    description: String,
    link: String,
});

const User = mongoose.model('User', userSchema);


// Passport

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ['profile', 'email'],
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOne({ googleId: profile.id })
        .then((user) => {
            if (user) {
                return cb(null, user);
            } else {
                const newUser = new User({
                    email: profile.displayName,
                    googleId: profile.id
                });
                console.log(profile.displayName);
                newUser.save();
            }
        })
        .catch((err) => cb(err));
    }
));

passport.use(
    new LocalStrategy({ usernameField: 'usernameOrEmail' }, (usernameOrEmail, password, done) => {
        User.findOne({ $or: [{username: usernameOrEmail}, {email: usernameOrEmail}] })
        .then((user) => {
            console.log(user);
            if (!user) {
                return done(null, false, { message: 'Incorrect email or username.' });
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return done(err);
                }
                if (result === true) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            })
        })
        .catch((err) => {
            console.log(err);
            done(err);
        })
    })
)

passport.serializeUser((user, cb) => { 	// Store a cookie in browser
    cb(null, user.id);				// and store this data in the cookie
}) 

passport.deserializeUser((id, cb) => { 	// Open the cookie to get the data inside
    User.findOne({_id: id})
    .then((user) => {
        cb(null, user);
    }) 
    .catch((err) => { 
        cb(err, null);
    });
})



// Routes

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', // callback
  passport.authenticate('google', { 
    failureRedirect: `${CLIENT_URL}/`, 
    successRedirect: `${CLIENT_URL}/home`
    })
);

app.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
    .then((user) => {
        if (user) {
            res.send('Email already used!');
        } else {
            if (req.body.password === req.body.confirmPassword) {
                bcrypt.hash(req.body.password, 10)
                .then((hashedPassword) => {
                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: hashedPassword
                    })
                    newUser.save()
                    .then((response) => {
                        console.log(response);
                        req.logIn(newUser, (err) => {
                            if (err) return (next(err));
                            res.send('User successfully created and authenticated');
                        })
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            } else {
                res.send('Password doesnt match');
            }
        }
    })
    .catch((err) => console.log(err));
})

app.post('/login', (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', (err, user, info) => {
        console.log(err);
        console.log(user);
        console.log(info);
        if (err) return (next(err));
        if (!user) return (res.send('no user exists'));
        req.logIn(user, (err) => {
            if (err) return (next(err));
            res.send('Successfully Authenticated');
            console.log(req.user);              
        })
    })(req,res,next);
})

app.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) console.log(err);
        else res.send('Logout successfully');
    });
});

// req.user contain all the data in of user in the cookie
app.get('/user', (req, res) => {
    res.send(req.user);
})

// Check if user is authenticate, if not redirect him to /login
app.get('/', (req, res) => {
    if (!req.user) {
        res.redirect(`${CLIENT_URL}/login`);
    }
})




app.listen(PORT, () => `Server is listening to Port ${PORT}`);