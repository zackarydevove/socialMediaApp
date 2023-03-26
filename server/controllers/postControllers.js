const User = require('../models/UserModel');
const Post = require('../models/PostModel');
const mongoose = require('mongoose');

module.exports.post = (req, res) => {
    User.findOne(req.user._id)
    .then((user) => {
        const newPost = new Post({
            type: req.body.type, // Tweet or reply
            creator: user._id,
            content: req.body.content,
        })
        newPost.save()
        .then((post) => {
            user.post = user.post || [];
            user.post.unshift(post._id);
            return (user.save());
        })
        .catch((err) => {
            console.log(err);
        })
    })
    .catch((err) => console.log(err));
};

module.exports.getPost = (req, res) => {
    Post.findOne({_id: req.body.postId})
    .then((post) => {
        console.log('Post', post._id,'sent\n');
        res.send(post);
    })
    .catch((err) => console.log(err));
};

module.exports.deletePost = (req, res) => {
    const postId = req.params.postId;
    Post.findOne({_id: postId})
    .then((post) => {
         // if user is creator
        if (post.creator.toString() === req.user._id.toString()) { 
            User.findOne(req.user._id)
            .then((user) => {
                // erase the post id from his replies array
                user.replies.splice(user.post.indexOf(postId), 1); 
                user.save()
                .then(() => {
                    // If post is a reply to another post, erase it from the original post reply array
                    if (post.type === 'reply') {
                        Post.findOne({_id: post.repliedTo})
                        .then((postRepliedTo) => {
                            postRepliedTo.replies.reply = postRepliedTo.replies.reply.filter((repliesId) => repliesId.toString() !== post._id.toString())
                            postRepliedTo.replies.count -= 1;
                            postRepliedTo.save()
                            .then(() => console.log('Post removed from the repliedTo post'))
                            .catch((err) => console.log(err));
                        })
                    }
                    // Erase the post document from the post model
                    Post.findOneAndDelete({ _id: postId })  
                    .then((post) => {
                        console.log('Post deleted');
                        res.status(200).send('Post deleted');
                    })
                    .catch((err) => {
                        res.status(404).send('Post not found');
                        console.log(err);
                    });
                })
                .catch((err) => {
                    res.status(500).send('Server error');
                    console.log(err);
                });
            })
            .catch((err) => {
                res.status(500).send('Server error');
                console.log(err);
            });
        } else {
            res.status(401).send('Unauthorized, you are not the creator');
        }
    })
    .catch((err) => {
        res.status(404).send('Post not found');
        console.log(err);
    });
};

module.exports.like = (req, res) => {
    Post.findOne({_id: req.body.postId})
    .then((post) => {
        User.findOne(req.user._id)
        .then((user) => {
            if (post.likes.users.includes(user._id)) {
                post.likes.users = post.likes.users.filter((userId) => userId.toString() !== user._id.toString());
                post.likes.count -= 1;
                user.likes = user.likes.filter((postId) => postId.toString() !== post._id.toString());
                post.save().then(() => user.save())
                console.log('Post', post._id ,'unliked by', user._id, '\n');
                res.send('Post successfully unliked')
            } else {
                post.likes.users.unshift(user._id);
                post.likes.count += 1;
                user.likes.unshift(post._id);
                post.save().then(() => user.save())
                console.log('Post', post._id ,'liked by', user._id, '\n');
                res.send('Post successfully liked');
            }
        })
        .catch((err) => {
            res.send('User not found');
            console.log(err);
        });
    })
    .catch((err) => {
        res.send('Post not found');
        console.log(err);
    })
}

module.exports.reply = (req, res) => {
    Post.findOne({_id: req.body.postId})
    .then((post) => {
        User.findOne(req.user._id)
        .then((user) => {
            const newReply = new Post({
                type: 'reply',
                creator: new mongoose.Types.ObjectId(user._id),
                content: req.body.replyContent,
                repliedTo: post._id,
            })
            newReply.save()
            .then((reply) => {
                post.replies.reply = post.replies.reply || [];
                post.replies.reply.unshift(reply._id);
                post.replies.count += 1;
                user.replies = user.replies || [];
                user.replies.unshift(new mongoose.Types.ObjectId(reply._id));
                post.save()
                .then(() => {
                    user.save()
                    .then(() => {
                        console.log('user', user, 'successfully replied to', post._id, '\n');
                        res.send('Successfully replied\n')
                    })
                    .catch((err) => console.log(err));
                });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

module.exports.deleteReply = (req, res) => {

}

module.exports.retweet = (req, res) => {
    Post.findOne({_id: req.body.postId})
    .then((post) => {
        User.findOne(req.user._id)
        .then((user) => {
            if (post.retweet.users.includes(user._id)) {
                post.retweet.users = post.retweet.users.filter((userId) => userId.toString() !== user._id.toString());
                post.retweet.count -= 1;
                user.retweet = user.retweet.filter((postId) => postId.toString() !== post._id.toString());
                post.save().then(() => user.save())
                console.log('Post', post._id ,'unretweeted by', user._id, '\n');
                res.send('Post successfully unretweeted')
            } else {
                post.retweet.users = post.retweet.users || [];
                post.retweet.users.unshift(user._id);
                post.retweet.count += 1;
                user.retweet = user.retweet || [];
                user.retweet.unshift(new mongoose.Types.ObjectId(post._id));
                post.save()
                .then(() => {
                    user.save()
                    .then(() => {
                        console.log('user', user, 'successfully retweeted', post._id, '\n');
                        res.send('Successfully retweet\n')
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

module.exports.bookmark = (req, res) => {
    const postId = req.body.postId;
    User.findOne(req.user._id)
    .then((user) => {
        // If already bookmark, then delete bookmarks from user bookmarks
        if (user.bookmarks.includes(postId)) {
            user.bookmarks = user.bookmarks.filter((bookmarkId) => bookmarkId.toString() !== postId.toString());
            user.save()
            .then(() => {
                console.log('user', user._id, 'delete bookmark', postId);
                res.send('delete bookmark successful');
            })
            .catch((err) => {
                console.log('error in deleting bookmark when saving user');
                res.status(500).send('error in server while trying to delete bookmark');
            })
        } else {
            user.bookmarks.unshift(postId);
            user.save()
            .then(() => {
                console.log('user', user._id, 'bookmark', postId);
                res.send('bookmark successful');
            })
            .catch((err) => {
                console.log('error in bookmark when saving user');
                res.status(500).send('error in server while trying to bookmark tweet');
            })
        }
    })
    .catch((err) => {
        console.log('user not found', err);
        res.status(404).send('user not found');
    })
}