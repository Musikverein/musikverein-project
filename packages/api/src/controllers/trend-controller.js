const {
  MonthlyFollowedPlayListRepo,
  MonthlyPlayedSongRepo,
  MonthlyLikedSongRepo,
  MonthlyFollowedUserRepo,
} = require('../repositories');
const { getYearMonth, responseTransfromTrend } = require('../utils/utils');

async function getTrendSongs(req, res, next) {
  const yearMonth = getYearMonth();
  try {
    const response = await MonthlyLikedSongRepo.findSongsLiked({
      yearMonth: yearMonth,
    });
    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      const responseTransform = responseTransfromTrend(response.data);
      return res.status(200).send({
        data: responseTransform,
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
    const response = await MonthlyFollowedPlayListRepo.findPlayLists({
      yearMonth: yearMonth,
    });
    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      const responseTransform = responseTransfromTrend(response.data);
      return res.status(200).send({
        data: responseTransform,
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
    const response = await MonthlyFollowedUserRepo.findUsers({
      yearMonth: yearMonth,
    });
    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      const responseTransform = responseTransfromTrend(response.data);
      return res.status(200).send({
        data: responseTransform,
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
    const response = await MonthlyPlayedSongRepo.findSongsPlayed({
      yearMonth: yearMonth,
    });
    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      const responseTransform = responseTransfromTrend(response.data);
      return res.status(200).send({
        data: responseTransform,
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
