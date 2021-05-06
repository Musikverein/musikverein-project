const { UserRepo } = require('../repositories');

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

module.exports = {
  signUp: signUp,
  signOut: signOut,
  update: update,
  getUser: getUser,
  getUserFollowedPopulate: getUserFollowedPopulate,
  getUserFollowingPopulate: getUserFollowingPopulate,
};
