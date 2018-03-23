const botBuilder = require("claudia-bot-builder");
const router = require("./router");
const data = require("data");

module.exports = botBuilder(
  request => {
    return data
      .fetchS3()
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
