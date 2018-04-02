const botBuilder = require("claudia-bot-builder");
const router = require("./router");
const processConvesation = require("./process-conversation");

module.exports = botBuilder(
  message =>
    processConvesation(message).then(previousMessage =>
      router(message, previousMessage)
    ),
  { platforms: ["facebook"] }
);
