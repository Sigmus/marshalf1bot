require('dotenv').config({silent: true});

module.exports = {
  appSecret: process.env.MESSENGER_APP_SECRET,
  validationToken: process.env.MESSENGER_VALIDATION_TOKEN,
  pageAccessToken: process.env.MESSENGER_PAGE_ACCESS_TOKEN,
  pageId: process.env.MESSENGER_PAGE_ID,
  port: process.env.PORT
};
