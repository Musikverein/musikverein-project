const { TrendRepo } = require('../repositories');
const { getYearMonth } = require('../utils/utils');

async function getTrendSongs(req, res, next) {
  const yearMonth = getYearMonth();
  try {
    const response = await TrendRepo.findSongsLiked({ yearMonth: yearMonth });
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
async function getTrendPlayLists(req, res, next) {
  const yearMonth = getYearMonth();

  try {
    const response = await TrendRepo.findPlayLists({ yearMonth: yearMonth });
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
async function getTrendUsers(req, res, next) {
  const yearMonth = getYearMonth();

  try {
    const response = await TrendRepo.findUsers({ yearMonth: yearMonth });
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
async function getTrendPlayed(req, res, next) {
  const yearMonth = getYearMonth();

  try {
    const response = await TrendRepo.findSongsPlayed({ yearMonth: yearMonth });
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
  getTrendSongs: getTrendSongs,
  getTrendPlayLists: getTrendPlayLists,
  getTrendUsers: getTrendUsers,
  getTrendPlayed: getTrendPlayed,
};
