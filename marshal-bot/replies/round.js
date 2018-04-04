const { fbTemplate } = require("claudia-bot-builder");
const size = require("lodash/size");
const moment = require("moment");
require("moment-timezone");

const settings = require("../settings");

const db = require("marshal-db/ergast");
const season = require("marshal-seasons/season");
const lastWinners = require("marshal-seasons/archive/last-winners");

module.exports = roundIndex => {
  return Promise.all([
    db.fetchItem(`${season.year}/qualifying`),
    db.fetchItem(`${season.year}/results`)
  ]).then(response => {
    const qualifying = response[0][roundIndex] ? response[0][roundIndex] : [];
    const results = response[1][roundIndex] ? response[1][roundIndex] : [];

    const when = moment.unix(season.data[roundIndex].ts);

    if (settings.getKey("timezone")) {
      when.tz(settings.getKey("timezone"));
    }

    let content = `${season.data[roundIndex].title} Grand Prix\n${when.format(
      "MMM Do, LT"
    )} – Round ${season.data[roundIndex].round}`;

    if (!size(results)) {
      content +=
        "\n\nLast Winners\n" +
        lastWinners[season.data[roundIndex].slug]
          .reverse()
          .map(item => `${item.season}. ${item.driver}`)
          .join("\n");
    }

    const obj = new fbTemplate.Text(content);

    if (size(qualifying) > 0) {
      obj.addQuickReply("Qualifying", `qualifying ${roundIndex + 1}`);
    }

    if (size(results) > 0) {
      obj.addQuickReply("Race Results", `results ${roundIndex + 1}`);
    }
    obj.addQuickReply("Remaining races", "remaining");

    return obj.get();
  });
};
