const { MonthlyPlayedSongRepo } = require('../repositories');

async function addReproduction(req, res, next) {
  const { songId } = req.body;

  const currentDate = new Date();
  const currentMonth = currentDate.getUTCMonth() + 1;
  const currentYear = currentDate.getUTCFullYear();
  const yearMonth = `${currentYear}/${
    currentMonth < 10 ? '0' + currentMonth : currentMonth
  }`;

  try {
    const findresponse = await MonthlyPlayedSongRepo.find({
      yearMonth: yearMonth,
    });

    if (findresponse.error) {
      return res.status(400).send({
        data: null,
        error: findresponse.error,
      });
    }

    if (findresponse.data) {
      if (findresponse.data.playbacks.get(songId)) {
        const updatedResponse = await MonthlyPlayedSongRepo.findByIdAndIncrement(
          findresponse.data._id,
          songId,
        );

        if (updatedResponse.error) {
          return res.status(400).send({
            data: null,
            error: updatedResponse.error,
          });
        }

        if (updatedResponse.data) {
          return res.status(200).send({
            data: 'OK',
            error: null,
          });
        }
      } else {
        const updatedResponse = await MonthlyPlayedSongRepo.findByIdAndAddSong(
          findresponse.data._id,
          songId,
        );

        if (updatedResponse.error) {
          return res.status(400).send({
            data: null,
            error: updatedResponse.error,
          });
        }

        if (updatedResponse.data) {
          return res.status(200).send({
            data: 'OK',
            error: null,
          });
        }
      }
    }

    const response = await MonthlyPlayedSongRepo.create({
      yearMonth: yearMonth,
      playbacks: { [songId]: { song: songId, reproductions: 1 } },
    });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(200).send({
        data: 'OK',
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addReproduction: addReproduction,
};
