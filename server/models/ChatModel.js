const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    participants: {
        type: [mongoose.ObjectId],
        default: [],
        required: true,
    },
    lastMessage: {
        type: mongoose.ObjectId,
    }
})

module.exports = mongoose.model('Chat', chatSchema);