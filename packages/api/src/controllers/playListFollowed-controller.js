const { MonthlyFollowedPlayListRepo } = require('../repositories');
const { getYearMonth } = require('../utils/utils');

async function addFollowPlayList(playListId) {
  const yearMonth = getYearMonth();

  try {
    const findresponse = await MonthlyFollowedPlayListRepo.find({
      yearMonth: yearMonth,
    });

    if (findresponse.error) {
      return {
        data: null,
        error: findresponse.error,
      };
    }

    if (findresponse.data) {
      const index = findresponse.data.followed.findIndex(
        (el) => String(el.playList) === String(playListId),
      );
      if (index !== -1) {
        const updatedResponse = await MonthlyFollowedPlayListRepo.findByIdAndIncrement(
          findresponse.data._id,
          playListId,
        );

        if (updatedResponse.error) {
          return {
            data: null,
            error: updatedResponse.error,
          };
        }

        if (updatedResponse.data) {
          return {
            data: 'OK',
            error: null,
          };
        }
      } else {
        const updatedResponse = await MonthlyFollowedPlayListRepo.findByIdAndAddPlayList(
          findresponse.data._id,
          playListId,
        );

        if (updatedResponse.error) {
          return {
            data: null,
            error: updatedResponse.error,
          };
        }

        if (updatedResponse.data) {
          return {
            data: 'OK',
            error: null,
          };
        }
      }
    }

    const response = await MonthlyFollowedPlayListRepo.create({
      yearMonth: yearMonth,
      followed: [{ playList: playListId, follows: 1 }],
    });

    if (response.error) {
      return {
        data: null,
        error: response.error,
      };
    }

    if (response.data) {
      return {
        data: 'OK',
        error: null,
      };
    }
  } catch (error) {
    return {
      data: null,
      error: error.message,
    };
  }
}

async function removeFollowPlayList(playListId) {
  const yearMonth = getYearMonth();

  try {
    const findresponse = await MonthlyFollowedPlayListRepo.find({
      yearMonth: yearMonth,
    });

    if (findresponse.error) {
      return {
        data: null,
        error: findresponse.error,
      };
    }

    if (findresponse.data) {
      const index = findresponse.data.followed.findIndex(
        (el) => String(el.playList) === String(playListId),
      );
      if (index !== -1) {
        const updatedResponse = await MonthlyFollowedPlayListRepo.findByIdAndDecrement(
          findresponse.data._id,
          playListId,
        );

        if (updatedResponse.error) {
          return {
            data: null,
            error: updatedResponse.error,
          };
        }

        if (updatedResponse.data) {
          return {
            data: 'OK',
            error: null,
          };
        }
      } else {
        const updatedResponse = await MonthlyFollowedPlayListRepo.findByIdAndAddPlayListWithDecrement(
          findresponse.data._id,
          playListId,
        );

        if (updatedResponse.error) {
          return {
            data: null,
            error: updatedResponse.error,
          };
        }

        if (updatedResponse.data) {
          return {
            data: 'OK',
            error: null,
          };
        }
      }
    }

    const response = await MonthlyFollowedPlayListRepo.create({
      yearMonth: yearMonth,
      followed: [{ playList: playListId, follows: -1 }],
    });

    if (response.error) {
      return {
        data: null,
        error: response.error,
      };
    }

    if (response.data) {
      return {
        data: 'OK',
        error: null,
      };
    }
  } catch (error) {
    return {
      data: null,
      error: error.message,
    };
  }
}

module.exports = {
  addFollowPlayList: addFollowPlayList,
  removeFollowPlayList: removeFollowPlayList,
};
