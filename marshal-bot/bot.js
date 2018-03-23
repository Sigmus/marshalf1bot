const botBuilder = require("claudia-bot-builder");
const router = require("./router");
const fetchS3 = require("./data/fetch-s3");

module.exports = botBuilder(
  request => {
    return fetchS3()
      .then(response => {
        const cmd = request.text.toLowerCase();
        return router(cmd, response);
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  },
  { platforms: ["facebook"] }
);
