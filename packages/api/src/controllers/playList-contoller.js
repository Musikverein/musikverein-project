const { PlayListRepo } = require('../repositories');

async function create(req, res, next) {
  const { _id } = req.user;
  const { title, type, songs, isPublic, image } = req.body;

  try {
    const response = await PlayListRepo.create({
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
      } = response.data;
      return res.status(201).send({
        data: { title, owner, type, image, songs, followedBy, isPublic },
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getPlaylist(req, res, next) {
  const { _id } = req.user;

  try {
    const response = await PlayListRepo.find({
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

async function getFollowPlaylist(req, res, next) {
  const { _id } = req.user;

  try {
    const response = await PlayListRepo.find({
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

async function deletePlaylist(req, res, next) {
  const { _id } = req.user;
  const { playListId } = req.body;
  try {
    const response = await PlayListRepo.findOneAndDelete({
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
    const response = await PlayListRepo.findOne({ _id: playListId });
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

      const updatedPlayList = await PlayListRepo.findOneAndUpdate(
        { _id: playListId },
        { followedBy: newFollowedBy },
        {
          new: true,
          select: 'title owner type songs followedBy isPublic image',
        },
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
    const response = await PlayListRepo.findOneAndUpdate(
      { _id: playListId, owner: _id },
      { title, type, isPublic, image },
      {
        new: true,
        select: 'title owner type isPublic followedBy songs image',
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

module.exports = {
  create: create,
  getPlaylist: getPlaylist,
  getFollowPlaylist: getFollowPlaylist,
  deletePlaylist: deletePlaylist,
  followPlayList: followPlayList,
  editPlayList: editPlayList,
};
