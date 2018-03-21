const { fbTemplate } = require("claudia-bot-builder");
const size = require("lodash/size");
const moment = require("moment");

module.exports = (data, roundNumber) => {
  const obj = new fbTemplate.Button(
    `${data.raceName}\n${moment.unix(data.ts).format("MMM Do, LT")} – Round ${
      data.round
    }`
  );

  if (size(data.results) > 0) {
    if (data.results[2017]) {
      obj.addButton("Race Results", `results ${roundNumber}`);
    }
  }

  if (size(data.qualifying) > 0) {
    obj.addButton("Qualifying", `qualifying ${roundNumber}`);
  }

  obj.addButton("Remaining races", "remaining");

  return obj.get();
};
