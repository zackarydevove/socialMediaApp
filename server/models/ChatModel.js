const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    participants: {
        type: [mongoose.ObjectId],
        default: [],
        required: true,
    }
})

module.exports = mongoose.model('Chat', chatSchema);