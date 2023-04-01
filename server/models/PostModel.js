const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    type: { 
        type: String, 
        required: true 
    },
    creator: { 
        type: mongoose.ObjectId, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    likes: {
         // users id who likes
        users: { 
            type: [mongoose.ObjectId], 
            default: []
        }, 
        count: { 
            type: Number, 
            default: 0 
        },
    },
    retweet: {
        // users id who retweet
        users: { 
            type: [mongoose.ObjectId], 
            default: []
        },
        count: { 
            type: Number, 
            default: 0 
        },
    },
    replies: {
        // post id of replies
        reply: { 
            type: [mongoose.ObjectId], 
            default: []
        },  
        count: { 
            type: Number, 
            default: 0 
        },
    },
    // post id of main tweet
    repliedTo: mongoose.ObjectId,       
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
})

module.exports = mongoose.model('Post', postSchema);