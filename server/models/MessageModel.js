const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.ObjectId,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.ObjectId,
        required: true,
    },
    receiver: {
        type: [mongoose.ObjectId],
        required: true,
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
})

module.exports = mongoose.model('Message', messageSchema);