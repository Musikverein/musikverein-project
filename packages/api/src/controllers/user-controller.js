const { UserRepo } = require('../repositories');
const {
  removeFollowUser,
  addFollowUser,
} = require('./userFollowed-controller');

async function signUp(req, res, next) {
  const { uid, email } = req.user;

  try {
    const response = await UserRepo.findUser({ email: email });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(200).send({
        data: response.data,
        error: null,
      });
    }

    const { data, error } = await UserRepo.create({
      firebaseId: uid,
      email: email,
    });

    if (error) {
      return res.status(400).send({
        data: null,
        error: error,
      });
    }

    res.status(201).send({
      data: {
        _id: data._id,
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
        following: data.following,
        followedBy: data.followedBy,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function signOut(req, res) {
  req.signOut();

  res.status(200).send({
    data: 'OK',
    error: null,
  });
}

async function update(req, res, next) {
  const { uid } = req.user;
  const { firstName, lastName, userName, image } = req.body;

  try {
    let response = null;

    response = await UserRepo.findUserAndUpdate(
      { firebaseId: uid },
      { firstName, lastName, userName, ...(image && { image }) },
    );

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(202).send({
        data: response.data,
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  const { userId } = req.params;

  try {
    const response = await UserRepo.findUser({ _id: userId });
    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(202).send({
        data: response.data,
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getUserFollowedPopulate(req, res, next) {
  const { userId } = req.params;

  try {
    const response = await UserRepo.getUserFollowedPopulate({ _id: userId });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(202).send({
        data: response.data,
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getUserFollowingPopulate(req, res, next) {
  const { userId } = req.params;
  try {
    const response = await UserRepo.getUserFollowingPopulate({ _id: userId });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(202).send({
        data: response.data,
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function followUser(req, res, next) {
  const { _id } = req.user;
  const { userId } = req.body;
  console.log({ userId }, { _id });

  try {
    const responseUserFollowed = await UserRepo.findUser({ _id: userId });
    if (responseUserFollowed.error) {
      return res.status(400).send({
        data: null,
        error: responseUserFollowed.error,
      });
    }
    const responseUserFollowing = await UserRepo.findUser({ _id: _id });
    if (responseUserFollowing.error) {
      return res.status(400).send({
        data: null,
        error: responseUserFollowing.error,
      });
    }

    if (responseUserFollowed.data && responseUserFollowing.data) {
      const { followedBy } = responseUserFollowed.data;
      const { following } = responseUserFollowing.data;

      let newFollowedBy = null;
      let followedMetadataUpdated = null;
      if (followedBy.indexOf(_id) !== -1) {
        newFollowedBy = followedBy.filter((id) => String(id) !== String(_id));
        followedMetadataUpdated = await removeFollowUser(_id);
      } else {
        newFollowedBy = [...followedBy, _id];
        followedMetadataUpdated = await addFollowUser(_id);
      }

      const newFollowing =
        following.indexOf(userId) !== -1
          ? following.filter((id) => String(id) !== String(userId))
          : [...following, userId];

      const updatedUserFollowed = await UserRepo.findUserAndUpdate(
        { _id: userId },
        { followedBy: newFollowedBy },
      );

      if (updatedUserFollowed.error || followedMetadataUpdated.error) {
        return res.status(400).send({
          data: null,
          error: updatedUserFollowed.error,
        });
      }
      const updatedUserFollowing = await UserRepo.findUserAndUpdate(
        { _id: _id },
        { following: newFollowing },
      );

      if (updatedUserFollowing.error || followedMetadataUpdated.error) {
        return res.status(400).send({
          data: null,
          error: updatedUserFollowing.error,
        });
      }

      if (
        updatedUserFollowed.data &&
        updatedUserFollowing.data &&
        followedMetadataUpdated.data
      ) {
        return res.status(200).send({
          data: updatedUserFollowed.data,
          error: null,
        });
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signUp: signUp,
  signOut: signOut,
  update: update,
  getUser: getUser,
  getUserFollowedPopulate: getUserFollowedPopulate,
  getUserFollowingPopulate: getUserFollowingPopulate,
  followUser: followUser,
};
