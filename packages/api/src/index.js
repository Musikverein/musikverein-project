const { app } = require('./server');
const { config } = require('./config');
const { connect } = require('./db/connect');
const { GenreRepo } = require('./repositories');
const genres = require('./utils/genres');

if (!config.app.port) {
  throw new Error('App config is invalid');
}

connect().then(() => {
  app.listen(config.app.port, async () => {
    const response = await GenreRepo.find();
    if (response.error) console.log(response.error);
    if (response.data.length !== genres.genres.length) {
      const responseCreate = await GenreRepo.create(genres.genres);
      if (responseCreate.error) console.log(responseCreate.error);
    }
    console.log(`Server listening on ${config.app.port}`);
  });
});
