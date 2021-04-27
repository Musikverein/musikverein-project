const { PlayListRepo } = require('../repositories');

async function create(req, res, next) {
  const { _id } = req.user;
  const { title, type, songs } = req.body;

  try {
    const response = await PlayListRepo.create({
      title,
      type,
      owner: _id,
      ...(songs && { songs }),
    });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(201).send({
        data: response.data,
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create: create,
};
