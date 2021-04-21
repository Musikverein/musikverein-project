const { SongRepo } = require('../repositories');

async function createSong(req, res, next) {
  const { title, duration, url, artist, genre, image } = req.body;
  const { _id } = req.user;

  try {
    const query = {
      title,
      duration,
      url,
      artist,
      genre,
      owner: _id,

      ...(image && { image }),
    };

    const response = await SongRepo.create(query);

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
  createSong: createSong,
};
