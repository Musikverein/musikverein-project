const { app } = require("./server");
const { config } = require("./config");
const { connect } = require("./db/connect");

if (!config.app.port) {
  throw new Error("App config is invalid");
}

connect().then(() => {
  app.listen(config.app.port, () => {
    console.log(`Server listening on ${config.app.port}`);
  });
});
