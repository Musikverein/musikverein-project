const { PlayListRepo } = require('../repositories');
const {
  findPlayListAndUpdate,
} = require('../repositories/playList-repository');

async function createPlayList(req, res, next) {
  const { _id } = req.user;
  const { title, type, songs, isPublic, image } = req.body;

  try {
    const response = await PlayListRepo.createPlayList({
      title,
      type,
      owner: _id,
      isPublic,
      ...(image && { image }),
      ...(songs && { songs }),
    });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      const {
        title,
        owner,
        type,
        image,
        songs,
        followedBy,
        isPublic,
        _id,
      } = response.data;
      return res.status(201).send({
        data: { title, owner, type, image, songs, followedBy, isPublic, _id },
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getUserPlayList(req, res, next) {
  const { _id } = req.user;

  try {
    const response = await PlayListRepo.findPlayLists({
      owner: _id,
    });

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

async function getFollowPlayList(req, res, next) {
  const { _id } = req.user;

  try {
    const response = await PlayListRepo.findPlayLists({
      followedBy: _id,
    });

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

async function deletePlayList(req, res, next) {
  const { _id } = req.user;
  const { playListId } = req.body;
  try {
    const response = await PlayListRepo.findPlayListAndDelete({
      owner: _id,
      _id: playListId,
    });

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

async function followPlayList(req, res, next) {
  const { _id } = req.user;
  const { playListId } = req.body;

  try {
    const response = await PlayListRepo.findPlayList({ _id: playListId });
    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      const { followedBy } = response.data;
      const newFollowedBy =
        followedBy.indexOf(_id) !== -1
          ? followedBy.filter((id) => String(id) !== String(_id))
          : [...followedBy, _id];

      const updatedPlayList = await PlayListRepo.findPlayListAndUpdate(
        { _id: playListId },
        { followedBy: newFollowedBy },
      );

      if (updatedPlayList.error) {
        return res.status(400).send({
          data: null,
          error: updatedPlayList.error,
        });
      }

      if (updatedPlayList.data) {
        return res.status(200).send({
          data: updatedPlayList.data,
          error: null,
        });
      }
    }
  } catch (error) {
    next(error);
  }
}

async function editPlayList(req, res, next) {
  const { _id } = req.user;
  const { title, type, isPublic, playListId, image } = req.body;
  try {
    const response = await PlayListRepo.findPlayListAndUpdate(
      { _id: playListId, owner: _id },
      { title, type, isPublic, image },
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

async function addSongToPlayList(req, res, next) {
  const { _id } = req.user;
  const { playListId, songId } = req.body;

  try {
    const response = await PlayListRepo.findPlayList({
      _id: playListId,
      owner: _id,
    });
    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      const { songs } = response.data;
      if (songs.indexOf(songId) !== -1) {
        return res.status(400).send({
          data: null,
          error: 'This song is already in this playlist ',
        });
      }

      const updatedPlayList = await PlayListRepo.findPlayListAndPushSong(
        { _id: playListId },
        { songs: songId },
      );

      if (updatedPlayList.error) {
        return res.status(400).send({
          data: null,
          error: updatedPlayList.error,
        });
      }

      if (updatedPlayList.data) {
        return res.status(200).send({
          data: updatedPlayList.data,
          error: null,
        });
      }
    }
  } catch (error) {
    next(error);
  }
}

async function getPlayList(req, res, next) {
  const { playListId } = req.body;

  try {
    const response = await PlayListRepo.findPlayListAndPopulateSongs({
      _id: playListId,
    });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      const newSongs = response.data.songs.map((song) => song._id);
      const updatePlaylist = await findPlayListAndUpdate(
        { _id: playListId },
        { songs: newSongs },
      );

      if (updatePlaylist.error) {
        return res.status(400).send({
          data: null,
          error: updatePlaylist.error,
        });
      }
      if (updatePlaylist.data) {
        return res.status(202).send({
          data: response.data,
          error: null,
        });
      }
    }
  } catch (error) {
    next(error);
  }
}

async function deleteSongFromPlayList(req, res, next) {
  const { _id } = req.user;
  const { playListId, songId } = req.body;
  try {
    const response = await PlayListRepo.findPlayList({
      owner: _id,
      _id: playListId,
    });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      const { songs } = response.data;
      const newSongs = songs.filter((id) => String(id) !== String(songId));

      const updatedPlayList = await PlayListRepo.findPlayListAndUpdate(
        {
          owner: _id,
          _id: playListId,
        },
        { songs: newSongs },
      );

      if (updatedPlayList.error) {
        return res.status(400).send({
          data: null,
          error: updatedPlayList.error,
        });
      }

      if (updatedPlayList.data) {
        return res.status(200).send({
          data: updatedPlayList.data,
          error: null,
        });
      }
    }
  } catch (error) {
    next(error);
  }
}

async function updateOrderPlayList(req, res, next) {
  const { _id } = req.user;
  const { playListId, songs } = req.body;

  try {
    const updatedPlayList = await PlayListRepo.findPlayListAndUpdate(
      { _id: playListId, owner: _id },
      { songs: songs },
    );

    if (updatedPlayList.error) {
      return res.status(400).send({
        data: null,
        error: updatedPlayList.error,
      });
    }

    if (updatedPlayList.data) {
      return res.status(200).send({
        data: updatedPlayList.data,
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createPlayList: createPlayList,
  getUserPlayList: getUserPlayList,
  getFollowPlayList: getFollowPlayList,
  deletePlayList: deletePlayList,
  followPlayList: followPlayList,
  editPlayList: editPlayList,
  addSongToPlayList: addSongToPlayList,
  getPlayList: getPlayList,
  deleteSongFromPlayList: deleteSongFromPlayList,
  updateOrderPlayList: updateOrderPlayList,
};
