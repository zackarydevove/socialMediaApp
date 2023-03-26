const mongoose = require('mongoose');

const connectToDatabase = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB\n'))
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    })
};

module.exports = connectToDatabase;