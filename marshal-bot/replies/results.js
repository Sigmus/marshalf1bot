const { fbTemplate } = require("claudia-bot-builder");
const size = require("lodash/size");
const db = require("../db/ergast");
const season = require("../data/season");

module.exports = roundIndex => {
  return Promise.all([
    db.fetchItem(`${season.year}/qualifying`),
    db.fetchItem(`${season.year}/results`)
  ]).then(response => {
    const qualifying = response[0][roundIndex] ? response[0][roundIndex] : [];
    const results = response[1][roundIndex] ? response[1][roundIndex] : [];

    const content = results.results
      .map(
        item =>
          `${item.pos}. ${item.driver} ${
            item.time ? "(" + item.time + ")" : ""
          }`
      )
      .join("\n");

    const obj = new fbTemplate.Text(`${results.title} Results:\n\n${content}`);

    if (size(qualifying)) {
      obj.addQuickReply("Qualifying", `qualifying ${roundIndex + 1}`);
    }

    obj.addQuickReply("Race Details", `round ${roundIndex + 1}`);

    return obj.get();
  });
};
