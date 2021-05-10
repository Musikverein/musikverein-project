const { GenreRepo } = require('../repositories');

async function getGenres(req, res, next) {
  try {
    const response = await GenreRepo.find();
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
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getGenres: getGenres,
};
