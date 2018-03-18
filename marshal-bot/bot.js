const botBuilder = require("claudia-bot-builder");

module.exports = botBuilder(function(request) {
  return "Pong: " + request.text;
});
