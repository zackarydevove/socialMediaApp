const User = require('../models/UserModel');

module.exports.follow = (req, res) => {
    const userIdToFollow = req.body.userIdToFollow;
    const currentUserId = req.user._id;

    console.log('userIdToFollow:', userIdToFollow, '\n');
    console.log('currentUserId:', currentUserId, '\n')

    User.findById(currentUserId)
        .then((currentUser) => {
            console.log('currentUser:', currentUser, '\n')
            // If current user already follow userIdToFollow
            if (currentUser.follow.users.includes(userIdToFollow)) {
                // Unfollow user
                currentUser.follow.users = currentUser.follow.users.filter(userId => userId.toString() !== userIdToFollow);
                currentUser.follow.count -= 1;
                currentUser.save()
                // Update followedBy data of userIdToFollow
                .then(() => {
                    console.log('user', currentUser._id, 'unfollowed', userIdToFollow);
                    User.findById(userIdToFollow)
                        .then((userToUnfollow) => {
                            userToUnfollow.followedBy.users = userToUnfollow.followedBy.users.filter(userId => userId.toString() !== currentUserId.toString());
                            userToUnfollow.followedBy.count -= 1;
                            userToUnfollow.save()
                                .then(() => {
                                    res.status(200).send('User successfully unfollowed');
                                })
                                .catch(err => {
                                    console.log('Server error');
                                    res.status(500).send('Server error')
                                });
                        })
                        .catch(err => {
                            console.log('Server error');
                            res.status(404).send('User to unfollow not found')
                        });
                    })
                    .catch(err => {
                        console.log('Server error');
                        res.status(500).send('Server error')
                    });
            } else {
                // Follow user
                currentUser.follow.users.unshift(userIdToFollow);
                currentUser.follow.count += 1;
                currentUser.save()
                // Update followedBy data of userIdToFollow
                    .then(() => {
                        console.log('user', currentUser._id, 'followed', userIdToFollow);
                        User.findById(userIdToFollow)
                            .then((userToFollow) => {
                                userToFollow.followedBy.users.unshift(currentUserId);
                                userToFollow.followedBy.count += 1;
                                userToFollow.save()
                                    .then(() => {
                                        res.status(200).send('User successfully followed');
                                    })
                                    .catch(err => {
                                        console.log('Server error');
                                        res.status(500).send('Server error')
                                    });
                            })
                            .catch(err => {
                                console.log('Server error');
                                res.status(404).send('User to follow not found')
                            });
                    })
                    .catch(err => {
                        console.log('Server error');
                        res.status(500).send('Server error')
                    });
            }
        })
        .catch(err => {
            console.log('Server error');
            res.status(404).send('Current user not found')
        });
};


// Get all the users document that current user follow
module.exports.getFollowedUsers = (req, res) => {
    const { userId } = req.params;

    User.findById(userId)
      .then((user) => {
        User.find({ _id: { $in: user.follow.users } })
          .then((followedUsers) => {
            console.log('followers of', userId, 'sent\n');
            res.status(200).json(followedUsers);
          })
          .catch((err) => res.status(400).json({ error: 'Error fetching followed users', err }));
      })
      .catch((err) => res.status(400).json({ error: 'Error fetching user data', err }));
  };