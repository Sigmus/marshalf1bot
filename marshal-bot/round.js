const { fbTemplate } = require("claudia-bot-builder");
const moment = require("moment");

module.exports = data =>
  new fbTemplate.Button(
    `${data.raceName}\n${moment.unix(data.ts).format("MMM Do, LT")} – Round ${
      data.round
    }`
  )
    .addButton("Awesome", "AWESOME")
    .get();
