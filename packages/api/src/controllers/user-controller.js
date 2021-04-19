const { UserRepo } = require('../repositories');

async function signUp(req, res, next) {
  const { uid, email } = req.user;

  try {
    const response = await UserRepo.findOne({ email: email });

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

async function update(req, res) {
  const { uid } = req.user;
  const { firstName, lastName, userName, image } = req.body;

  try {
    let response = null;

    if (image) {
      response = await UserRepo.findOneAndUpdate(
        { firebaseId: uid },
        { firstName, lastName, userName, image },
        {
          new: true,
          select: 'firstName lastName userName image following followedBy',
        },
      );
    } else {
      response = await UserRepo.findOneAndUpdate(
        { firebaseId: uid },
        { firstName, lastName, userName },
        {
          new: true,
          select: 'firstName lastName userName image following followedBy',
        },
      );
    }

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
    return res.status(404).send({
      data: null,
      error: error.message,
    });
  }
}

module.exports = {
  signUp: signUp,
  signOut: signOut,
  update: update,
};
