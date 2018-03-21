const botBuilder = require("claudia-bot-builder");
const router = require("./router");
const fetchFromS3 = require("./fetch-from-s3");

module.exports = botBuilder(
  request => {
    return fetchFromS3()
      .then(data => {
        const cmd = request.text.toLowerCase();
        return router(cmd, data);
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  },
  { platforms: ["facebook"] }
);
