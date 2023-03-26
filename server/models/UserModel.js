const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: String,
    email: { 
        type: String, 
        required: true 
    },
    username: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
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
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('User', userSchema);