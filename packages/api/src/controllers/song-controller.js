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
        data: 'OK',
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getUserSongs(req, res, next) {
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

async function getLikedSongs(req, res, next) {
  const { _id } = req.user;

  try {
    const response = await SongRepo.findOwned({ likedBy: _id, active: true });
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
    const response = await SongRepo.findOne({ _id: songId, active: true });
    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      const { likedBy } = response.data;
      let newLikedBy =
        likedBy.indexOf(_id) !== -1
          ? likedBy.filter((id) => String(id) !== String(_id))
          : [...likedBy, _id];

      const updatedSong = await SongRepo.findOneAndUpdate(
        { _id: songId, active: true },
        { likedBy: newLikedBy },
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
  } catch (error) {
    next(error);
  }
}

async function deleteSong(req, res, next) {
  const { _id } = req.user;
  const { songId } = req.body;
  try {
    const response = await SongRepo.findOneAndUpdate(
      { _id: songId, owner: _id },
      { active: false },
      {
        new: true,
        select: '_id',
      },
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

async function editSong(req, res, next) {
  const { _id } = req.user;
  const { title, artist, genre, image, songId } = req.body;
  try {
    const response = await SongRepo.findOneAndUpdate(
      { _id: songId, owner: _id },
      { title, artist, genre, image },
      {
        new: true,
        select: 'title artist duration owner likedBy url genre image',
      },
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

async function searchSongs(req, res, next) {
  const { value } = req.body;

  try {
    const response = await SongRepo.find({
      $text: { $search: value },
      active: true,
      isPublic: true,
    });
    console.log(response);
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
  createSong: createSong,
  getUserSongs: getUserSongs,
  getLikedSongs: getLikedSongs,
  likeSong: likeSong,
  deleteSong: deleteSong,
  editSong: editSong,
  searchSongs: searchSongs,
};
