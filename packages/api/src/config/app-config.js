require('dotenv').config();

const { logger } = require('../services');

const {
  NODE_ENV = 'development',
  MONGO_DB_URL_PRODUCTION,
  MONGO_DB_URL_DEVELOPMENT,
  MONGO_DB_URL_TEST,
  PORT,
} = process.env;

const baseConfig = {
  app: {
    port: PORT || 4000,
  },
  client: {
    url: process.env.CLIENT_URL,
  },
  logger: {
    warn: logger.warn,
    info: logger.info,
    error: logger.error,
    trace: logger.trace,
    debug: logger.debug,
  },
  recaptcha: {
    key: process.env.RECAPTCHA_KEY,
  },
};

const config = {
  development: {
    ...baseConfig,
    db: {
      url: MONGO_DB_URL_DEVELOPMENT,
    },
  },
  test: {
    ...baseConfig,
    db: {
      url: MONGO_DB_URL_TEST,
    },
  },
  production: {
    ...baseConfig,
    db: {
      url: MONGO_DB_URL_PRODUCTION,
    },
  },
};

module.exports = {
  config: config[NODE_ENV],
};
