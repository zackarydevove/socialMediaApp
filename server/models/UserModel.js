const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: String,
    facebookId: String,
    email: { 
        type: String, 
    },
    username: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
    },
    // user id that follow this user
    followedBy: { 
        users: {
            type: [mongoose.ObjectId], 
            default: []
        },
        count: {
            type: Number,
            default: 0
        } 
    },    
    // user id that user follow
    follow: { 
        users: {
            type: [mongoose.ObjectId], 
            default: []
        },
        count: {
            type: Number,
            default: 0
        } 
    },
    // post id of user post
    post: { 
        type: [mongoose.ObjectId], 
        default: []
    },
    replies: { 
        type: [mongoose.ObjectId], 
        default: []
    },
    likes: { 
        type: [mongoose.ObjectId], 
        default: []
    },
    retweet: {
        type: [mongoose.ObjectId],
        default: []
    },
    bookmarks: {
        type: [mongoose.ObjectId],
        default: []
    },
    chat: {
        type: [mongoose.ObjectId],
        default: []
    },
    bannerImage: String,
    profilePicture: String,
    twittername: String,
    description: String,
    link: String,
    phone: String,
    country: String,
    age: Number,
    notificationCount: {
        type: Number,
        default: 0,
    },
    notifications: [{
        type: {
            type: String,
            enum: ['like', 'retweet', 'reply'],
            required: true,
        },
        fromUser: {
            type: mongoose.ObjectId,
            required: true,
        },
        post: {
            type: mongoose.ObjectId,
            required: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('User', userSchema);