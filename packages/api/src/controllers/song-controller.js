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

async function getSongs(req, res, next) {
  const { _id } = req.user;

  try {
    const response = await SongRepo.findOwned({ owner: _id, active: true });
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

async function likeSong(req, res, next) {
  const { _id } = req.user;
  const { songId } = req.body;

  try {
    const response = await SongRepo.findLike({ _id: songId, active: true });
    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      if (response.data.likedBy.includes(_id)) {
        const likeIndex = response.data.likeBy.findIndex((id) => id === _id);
        const newLikesArray = response.data.likedBy.splice(likeIndex, 1);
        const updatedSong = await SongRepo.findOneAndUpdate(
          { _id: songId, active: true },
          { likeBy: newLikesArray },
          {
            new: true,
            select: 'genre image artist likedBy title duration url owner',
          },
        );
        if (updatedSong.error) {
          return res.status(400).send({
            data: null,
            error: updatedSong.error,
          });
        }

        if (updatedSong.data) {
          return res.status(200).send({
            data: updatedSong.data,
            error: null,
          });
        }
      } else {
        const newLikeBy = [...response.data.likeBy, _id];
        const updatedSong = await SongRepo.findOneAndUpdate(
          { _id: songId, active: true },
          { likeBy: newLikeBy },
          {
            new: true,
            select: 'genre image artist likedBy title duration url owner',
          },
        );
        if (updatedSong.error) {
          return res.status(400).send({
            data: null,
            error: updatedSong.error,
          });
        }

        if (updatedSong.data) {
          return res.status(200).send({
            data: updatedSong.data,
            error: null,
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
}
module.exports = {
  createSong: createSong,
  getSongs: getSongs,
  likeSong: likeSong,
};
