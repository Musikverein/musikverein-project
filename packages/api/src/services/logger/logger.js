const logger = require("loglevel");

logger.enableAll();

module.exports = {
  warn: logger.warn,
  info: logger.info,
  error: logger.error,
  trace: logger.trace,
  debug: logger.debug,
};
