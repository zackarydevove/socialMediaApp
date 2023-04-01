const User = require('../models/UserModel');
const Post = require('../models/PostModel');
const jwt = require('jsonwebtoken');

// Get 10 post
module.exports.getFeed = (req, res) => {
    const { userId } = req.params;
    const page = req.query.page;
    const pageSize = 10;
    const skipCount = (page - 1) * pageSize;
    // Find the user to fetch data from
    User.findById(userId)
    .then((user) => {
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const followingIds = user.follow.users;
        User.find({ _id: { $in: followingIds } })
        .then((followedUsers) => {
            const followedUsersLikes = followedUsers.flatMap(user => user.likes);
            const followedUsersRetweets = followedUsers.flatMap(user => user.retweet);
            const followedUsersReplies = followedUsers.flatMap(user => user.replies);

            Post.aggregate([
                // Takes all post documents that user's followers posted, replied, retweeted, or liked
                {
                    $match: {
                        $or: [
                            { creator: { $in: [...followingIds, user._id] } }, // Posts by the user and users he follow
                            { _id: { $in: followedUsersLikes } }, // Liked posts by followed users
                            { _id: { $in: followedUsersRetweets } }, // Retweeted posts by followed users
                            { _id: { $in: followedUsersReplies } }, // Replied posts by followed users
                        ],
                    },
                },
                // Sort them from the most recent
                {
                    $sort: { createdAt: -1 },
                },
                // Skip posts based on the current page
                { $skip: skipCount },
                // Takes only 10 most recent
                { $limit: pageSize },
            ])
            .then((feedPosts) => {
                res.json(feedPosts);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}