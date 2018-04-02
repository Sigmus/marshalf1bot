const { fbTemplate } = require("claudia-bot-builder");
const size = require("lodash/size");
const db = require("marshal-db/ergast");
const season = require("../data/season");

module.exports = roundIndex => {
  return Promise.all([
    db.fetchItem(`${season.year}/qualifying`),
    db.fetchItem(`${season.year}/results`)
  ]).then(response => {
    const qualifying = response[0][roundIndex] ? response[0][roundIndex] : [];
    const results = response[1][roundIndex] ? response[1][roundIndex] : [];

    const content = qualifying.qualifying
      .map(
        item => `${item.pos}. ${item.driver} – ${item.q3 || item.q2 || item.q1}`
      )
      .join("\n");

    const obj = new fbTemplate.Text(
      `${qualifying.title} Grand Prix Qualifying:\n\n${content}`
    );

    if (size(results)) {
      obj.addQuickReply("Race Results", `results ${roundIndex + 1}`);
    }

    obj.addQuickReply("Race Details", `round ${roundIndex + 1}`);

    return obj.get();
  });
};
