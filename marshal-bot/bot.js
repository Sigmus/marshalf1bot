const botBuilder = require("claudia-bot-builder");
const router = require("./router");

module.exports = botBuilder(
  request => {
    const cmd = request.text.toLowerCase();
    console.log("cmd", cmd);
    return router(cmd);
  },
  { platforms: ["facebook"] }
);
