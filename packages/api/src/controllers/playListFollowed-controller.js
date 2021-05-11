const { MonthlyFollowedPlayListRepo } = require('../repositories');

async function addFollowPlayList(playListId) {
  const currentDate = new Date();
  const currentMonth = currentDate.getUTCMonth() + 1;
  const currentYear = currentDate.getUTCFullYear();
  const yearMonth = `${currentYear}/${
    currentMonth < 10 ? '0' + currentMonth : currentMonth
  }`;

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
      if (findresponse.data.followed.get(playListId)) {
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
      followed: { [playListId]: { playList: playListId, follows: 1 } },
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
  const currentDate = new Date();
  const currentMonth = currentDate.getUTCMonth() + 1;
  const currentYear = currentDate.getUTCFullYear();
  const yearMonth = `${currentYear}/${
    currentMonth < 10 ? '0' + currentMonth : currentMonth
  }`;

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
      if (findresponse.data.followed.get(playListId)) {
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
      followed: { [playListId]: { playList: playListId, follows: -1 } },
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
