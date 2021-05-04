const { UserRepo } = require('../repositories');

async function findIdMiddleware(req, res, next) {
  const { uid } = req.user;

  try {
    const response = await UserRepo.findUser({
      firebaseId: uid,
    });

    if (response.data) {
      req.user._id = response.data._id;
      next();
    } else {
      res.status(400).send({
        data: null,
        error: 'The user is not exists',
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { findIdMiddleware };
