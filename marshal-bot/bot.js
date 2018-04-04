const botBuilder = require("claudia-bot-builder");
const router = require("./router");
const processConvesation = require("./process-conversation");

module.exports = botBuilder(
  message => {
    console.log("message", JSON.stringify(message, null, 4));
    return processConvesation(message).then(previousMessage =>
      router(message, previousMessage)
    );
  },
  { platforms: ["facebook"] }
);
