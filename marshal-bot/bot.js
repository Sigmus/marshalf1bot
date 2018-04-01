const botBuilder = require("claudia-bot-builder");
const router = require("./router");

module.exports = botBuilder(router, { platforms: ["facebook"] });
