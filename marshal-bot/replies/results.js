const { fbTemplate } = require("claudia-bot-builder");
const size = require("lodash/size");
const db = require("marshal-db/ergast");
const season = require("marshal-seasons/season");

module.exports = roundIndex => {
  return Promise.all([
    db.fetchItem(`${season.year}/qualifying`),
    db.fetchItem(`${season.year}/results`)
  ]).then(response => {
    const qualifying = response[0][roundIndex] ? response[0][roundIndex] : [];
    const results = response[1][roundIndex] ? response[1][roundIndex] : [];

    const title = `${season.data[roundIndex].title} Grand Prix Results`;

    const obj = new fbTemplate.Text(
      size(results) > 0
        ? `${title}:\n\n${results.results
            .map(
              item =>
                `${item.pos}. ${item.driver} ${
                  item.time ? "(" + item.time + ")" : ""
                }`
            )
            .join("\n")}`
        : `${title} not available yet`
    );

    if (size(qualifying)) {
      obj.addQuickReply("Qualifying", `qualifying ${roundIndex + 1}`);
    }

    obj.addQuickReply("Race Details", `round ${roundIndex + 1}`);

    return obj.get();
  });
};
