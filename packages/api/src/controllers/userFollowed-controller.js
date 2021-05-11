const { MonthlyFollowedUserRepo } = require('../repositories');

async function addFollowUser(userId) {
  const currentDate = new Date();
  const currentMonth = currentDate.getUTCMonth() + 1;
  const currentYear = currentDate.getUTCFullYear();
  const yearMonth = `${currentYear}/${
    currentMonth < 10 ? '0' + currentMonth : currentMonth
  }`;

  try {
    const findresponse = await MonthlyFollowedUserRepo.find({
      yearMonth: yearMonth,
    });

    if (findresponse.error) {
      return {
        data: null,
        error: findresponse.error,
      };
    }

    if (findresponse.data) {
      if (findresponse.data.liked.get(userId)) {
        const updatedResponse = await MonthlyFollowedUserRepo.findByIdAndIncrement(
          findresponse.data._id,
          userId,
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
        const updatedResponse = await MonthlyFollowedUserRepo.findByIdAndAddSong(
          findresponse.data._id,
          userId,
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

    const response = await MonthlyFollowedUserRepo.create({
      yearMonth: yearMonth,
      followed: { [userId]: { user: userId, follows: 1 } },
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

async function removeFollowUser(userId) {
  const currentDate = new Date();
  const currentMonth = currentDate.getUTCMonth() + 1;
  const currentYear = currentDate.getUTCFullYear();
  const yearMonth = `${currentYear}/${
    currentMonth < 10 ? '0' + currentMonth : currentMonth
  }`;

  try {
    const findresponse = await MonthlyFollowedUserRepo.find({
      yearMonth: yearMonth,
    });

    if (findresponse.error) {
      return {
        data: null,
        error: findresponse.error,
      };
    }

    if (findresponse.data) {
      if (findresponse.data.liked.get(userId)) {
        const updatedResponse = await MonthlyFollowedUserRepo.findByIdAndDecrement(
          findresponse.data._id,
          userId,
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
        const updatedResponse = await MonthlyFollowedUserRepo.findByIdAndAddSongWithDecrement(
          findresponse.data._id,
          userId,
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

    const response = await MonthlyFollowedUserRepo.create({
      yearMonth: yearMonth,
      followed: { [userId]: { user: userId, follows: -1 } },
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
  addFollowUser: addFollowUser,
  removeFollowUser: removeFollowUser,
};
