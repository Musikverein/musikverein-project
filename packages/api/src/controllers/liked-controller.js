const { MonthlyLikedSongRepo } = require('../repositories');
const { getYearMonth } = require('../utils/utils');

async function addLike(songId) {
  const yearMonth = getYearMonth();
  try {
    const findresponse = await MonthlyLikedSongRepo.find({
      yearMonth: yearMonth,
    });

    if (findresponse.error) {
      return {
        data: null,
        error: findresponse.error,
      };
    }

    if (findresponse.data) {
      const index = findresponse.data.liked.findIndex(
        (el) => String(el.song) === String(songId),
      );
      if (index !== -1) {
        const updatedResponse = await MonthlyLikedSongRepo.findByIdAndIncrement(
          findresponse.data._id,
          songId,
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
        const updatedResponse = await MonthlyLikedSongRepo.findByIdAndAddSong(
          findresponse.data._id,
          songId,
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

    const response = await MonthlyLikedSongRepo.create({
      yearMonth: yearMonth,
      liked: [{ song: songId, likes: 1 }],
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

async function removeLike(songId) {
  const yearMonth = getYearMonth();

  try {
    const findresponse = await MonthlyLikedSongRepo.find({
      yearMonth: yearMonth,
    });

    if (findresponse.error) {
      return {
        data: null,
        error: findresponse.error,
      };
    }

    if (findresponse.data) {
      const index = findresponse.data.liked.findIndex(
        (el) => String(el.song) === String(songId),
      );
      if (index !== -1) {
        const updatedResponse = await MonthlyLikedSongRepo.findByIdAndDecrement(
          findresponse.data._id,
          songId,
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
        const updatedResponse = await MonthlyLikedSongRepo.findByIdAndAddSongWithDecrement(
          findresponse.data._id,
          songId,
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

    const response = await MonthlyLikedSongRepo.create({
      yearMonth: yearMonth,
      liked: [{ song: songId, likes: -1 }],
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
  addLike: addLike,
  removeLike: removeLike,
};
