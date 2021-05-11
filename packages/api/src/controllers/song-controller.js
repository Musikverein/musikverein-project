const { SongRepo } = require('../repositories');
const { addLike, removeLike } = require('./liked-controller');

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
    const response = await SongRepo.findSong({ _id: songId, active: true });
    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      const { likedBy } = response.data;

      let newLikedBy = null;
      let updatedMetadata = null;

      if (likedBy.indexOf(_id) !== -1) {
        newLikedBy = likedBy.filter((id) => String(id) !== String(_id));
        updatedMetadata = await removeLike(songId);
      } else {
        newLikedBy = [...likedBy, _id];
        updatedMetadata = await addLike(songId);
      }

      const updatedSong = await SongRepo.findSongAndUpdate(
        { _id: songId, active: true },
        { likedBy: newLikedBy },
      );

      if (updatedSong.error || updatedMetadata.error) {
        return res.status(400).send({
          data: null,
          error: updatedSong.error || updatedMetadata.error,
        });
      }

      if (updatedSong.data && updatedMetadata.data) {
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
    const response = await SongRepo.findSongAndDelete(
      { _id: songId, owner: _id },
      { active: false },
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
    const response = await SongRepo.findSongAndUpdate(
      { _id: songId, owner: _id, active: true },
      { title, artist, genre, image },
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

async function getSongs(req, res, next) {
  const { userId } = req.params;

  try {
    const response = await SongRepo.find({ owner: userId, active: true });
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

async function getSongWithOwnerPopulate(req, res, next) {
  const { songId } = req.params;

  try {
    const response = await SongRepo.findSongWithOwnerPopulate({
      _id: songId,
      active: true,
    });
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
  getSongs: getSongs,
  getSongWithOwnerPopulate: getSongWithOwnerPopulate,
};
