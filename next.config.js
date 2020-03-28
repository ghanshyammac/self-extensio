require('dotenv-safe').config();

module.exports = {
  compress: false,
  publicRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
};
