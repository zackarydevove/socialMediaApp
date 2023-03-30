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
  Post.findOne({ _id: postId })
    .then((post) => {
      if (post.creator.toString() === req.user._id.toString()) {
        User.findOne(req.user._id)
          .then((user) => {
            user.post.splice(user.post.indexOf(postId), 1);
            user.save()
              .then(() => {
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

                // Handle removing the post from the users who retweeted or liked it
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

                        // Add the following code to remove the post from the user's bookmarks array.
                        User.updateMany(
                          { bookmarks: postId },
                          { $pull: { bookmarks: postId } }
                        )
                          .then(() => {
                            console.log("Post removed from users' bookmarks");

                            // Continue with deleting the post
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
    // Find post liked
    Post.findOne({ _id: req.body.postId })
      .then((post) => {
        // Find user who liked
        User.findOne(req.user._id)
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
                  // Update user's liked posts
                  User.findOneAndUpdate(
                    { _id: req.user._id },
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
                    { _id: req.user._id },
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
    // Find post replied
    Post.findOne({_id: req.body.postId})
    .then((post) => {
        // Find user who replied
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
                        // Find creator to create notification
                        User.findOne(post.creator)
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
    const postId = req.body.postId;
    const userId = req.user._id;
  
    Post.findOne({ _id: postId })
      .then((post) => {
        User.findOne(userId)
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
    const postId = req.body.postId;
    console.log('postid:', postId);
    console.log('user:', req.user);
    User.findById(req.user._id)
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