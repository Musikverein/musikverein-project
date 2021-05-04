const { SongRepo, PlayListRepo } = require('../repositories');

async function searchSongs(req, res, next) {
  const { value } = req.body;
  console.log(value);

  try {
    const response = await SongRepo.searchSongs({
      value,
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

async function searchPlayLists(req, res, next) {
  const { value } = req.body;
  console.log(value);

  try {
    const response = await PlayListRepo.searchPlayLists({ value });

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
  searchSongs: searchSongs,
  searchPlayLists: searchPlayLists,
};
