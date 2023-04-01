const User = require('../models/UserModel');
const Post = require('../models/PostModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

module.exports.post = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // assuming token is in the format "Bearer <token>"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    User.findOne({ _id: userId })
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
  const token = req.headers.authorization.split(' ')[1]; // assuming token is in the format "Bearer <token>"
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;

  const postId = req.params.postId;
  Post.findOne({ _id: postId })
    .then((post) => {
      if (post.creator.toString() === userId.toString()) {
        User.findOne({ _id: userId })
          .then((user) => {
            user.post.splice(user.post.indexOf(postId), 1);
            user.replies = user.replies.filter((replyId) => replyId.toString() !== postId.toString()); // Remove post ID from user.replies array
            user.save()
              .then(() => {
                // Remove post from the original post's replies
                if (post.type === 'reply') {
                  Post.findOne({ _id: post.repliedTo })
                    .then((postRepliedTo) => {
                      if (postRepliedTo) {
                        postRepliedTo.replies.reply = postRepliedTo.replies.reply.filter((repliesId) => repliesId.toString() !== post._id.toString());
                        postRepliedTo.replies.count -= 1;
                        postRepliedTo.save()
                          .then(() => console.log('Post removed from the repliedTo post'))
                          .catch((err) => console.log(err));
                      } else {
                        console.log("The post that this reply was a reply to has already been deleted.");
                      }
                    });
                }

                // Remove deleted post from the users who retweeted or liked it
                const usersToUpdate = [...post.retweet.users, ...post.likes.users];
                User.updateMany(
                  { _id: { $in: usersToUpdate } },
                  {
                    $pull: { retweet: postId, likes: postId },
                  }
                )
                  .then(() => {
                    // Remove the post from the user's notifications array.
                    User.updateMany(
                      { "notifications.post": postId },
                      { $pull: { notifications: { post: postId } } }
                    )
                      .then(() => {
                        console.log("Post removed from users' notifications");

                        // Remove the post from the user's bookmarks array.
                        User.updateMany(
                          { bookmarks: postId },
                          { $pull: { bookmarks: postId } }
                        )
                          .then(() => {
                            console.log("Post removed from users' bookmarks");

                            // Delete the post
                            Post.findOneAndDelete({ _id: postId })
                              .then((post) => {
                                console.log("Post deleted");
                                res.status(200).send("Post deleted");
                              })
                              .catch((err) => {
                                res.status(404).send("Post not found");
                                console.log(err);
                              });
                          })
                          .catch((err) => {
                            console.log("Error updating users' bookmarks", err);
                          });
                      })
                      .catch((err) => {
                        console.log("Error updating users' notifications", err);
                      });
                  })
                  .catch((err) => {
                    console.log("Error updating users who retweeted or liked the post", err);
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
  const token = req.headers.authorization.split(' ')[1]; // assuming token is in the format "Bearer <token>"
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;

    // Find post liked
    Post.findOne({ _id: req.body.postId })
      .then((post) => {
        // Find user who liked
        User.findOne({ _id: userId })
          .then((user) => {
            if (post.likes.users.includes(user._id)) {
              // Unlike the post
              Post.findOneAndUpdate(
                { _id: req.body.postId },
                {
                  $pull: { "likes.users": user._id },
                  $inc: { "likes.count": -1 },
                },
                { new: true }
              )
                .then(() => {
                  // Update user's liked posts array
                  User.findOneAndUpdate(
                    { _id: userId },
                    { $pull: { likes: post._id } },
                    { new: true }
                  )
                    .then(() => {
                      console.log('Post', post._id, 'unliked by', user._id, '\n');
                      res.send('Post successfully unliked');
                    })
                    .catch((err) => {
                      res.send('Error while updating user likes');
                      console.log(err);
                    });
                })
                .catch((err) => {
                  res.send('Error while unliking the post');
                  console.log(err);
                });
            } else {
              // Like the post
              Post.findOneAndUpdate(
                { _id: req.body.postId },
                {
                  $addToSet: { "likes.users": user._id },
                  $inc: { "likes.count": 1 },
                },
                { new: true }
              )
                .then(() => {
                  // Update user's liked posts
                  User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { likes: post._id } },
                    { new: true }
                  )
                    .then(() => {
                      // Update the post creator's notifications
                      User.findOneAndUpdate(
                        { _id: post.creator },
                        {
                          $inc: { notificationCount: 1 },
                          $push: {
                            notifications: {
                              $each: [
                                {
                                  type: 'like',
                                  fromUser: user._id,
                                  post: post._id,
                                },
                              ],
                              $position: 0,
                            },
                          },
                        },
                        { new: true }
                      )
                        .then(() => {
                          console.log('Post', post._id, 'liked by', user._id, '\n');
                          res.send('Post successfully liked');
                        })
                        .catch((err) => {
                          res.send('Error while updating creator notifications');
                          console.log(err);
                        });
                    })
                    .catch((err) => {
                      res.send('Error while updating user likes');
                      console.log(err);
                    });
                })
                .catch((err) => {
                  res.send('Error while liking the post');
                  console.log(err);
                });
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
      });
  };

module.exports.reply = (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; // assuming token is in the format "Bearer <token>"
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;

    // Find post replied
    Post.findOne({_id: req.body.postId})
    .then((post) => {
        // Find user who replied
        User.findOne({ _id: userId })
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
                        // Find creator to create notification
                        User.findOne({ _id: post.creator })
                        .then((creator) => {
                            creator.notificationCount = creator.notificationCount || 0;
                            creator.notificationCount += 1;
                            creator.notifications.unshift({
                                type: 'reply',
                                fromUser: user._id,
                                post: reply._id,
                            })
                            creator.save()
                            .then(() => {
                                console.log('user', user, 'successfully replied to', post._id, '\n');
                                res.send(reply);
                            })
                            .catch((err) => console.log(err, 'error while saving creator'));
                        })
                        .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

module.exports.retweet = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // assuming token is in the format "Bearer <token>"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const postId = req.body.postId;
  
    Post.findOne({ _id: postId })
      .then((post) => {
        User.findOne({ _id: userId })
          .then((user) => {
            if (post.retweet.users.includes(user._id)) {
              Post.findOneAndUpdate(
                { _id: postId },
                {
                  $pull: { 'retweet.users': userId },
                  $inc: { 'retweet.count': -1 },
                }
              )
                .then(() => {
                  User.findOneAndUpdate(
                    { _id: userId },
                    { $pull: { retweet: postId } }
                  )
                    .then(() => {
                      console.log(
                        'Post',
                        postId,
                        'unretweeted by',
                        userId,
                        '\n'
                      );
                      res.send('Post successfully unretweeted');
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            } else {
              User.findOneAndUpdate(
                { _id: post.creator },
                {
                  $inc: { notificationCount: 1 },
                  $push: {
                    notifications: {
                      $each: [
                        {
                          type: 'retweet',
                          fromUser: userId,
                          post: postId,
                        },
                      ],
                      $position: 0,
                    },
                  },
                }
              )
                .then(() => {
                  Post.findOneAndUpdate(
                    { _id: postId },
                    {
                      $push: { 'retweet.users': userId },
                      $inc: { 'retweet.count': 1 },
                    }
                  )
                    .then(() => {
                      User.findOneAndUpdate(
                        { _id: userId },
                        { $push: { retweet: postId } }
                      )
                        .then(() => {
                          console.log(
                            'User',
                            userId,
                            'successfully retweeted',
                            postId,
                            '\n'
                          );
                          res.send('Successfully retweet\n');
                        })
                        .catch((err) => console.log(err));
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
    const token = req.headers.authorization.split(' ')[1]; // assuming token is in the format "Bearer <token>"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const postId = req.body.postId;

    User.findById(userId)
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