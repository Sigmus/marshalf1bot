const { fbTemplate } = require("claudia-bot-builder");
const size = require("lodash/size");
const moment = require("moment");
const fetchS3 = require("../data/fetch-s3");
const currentSeason = require("../data/archive/2018/season");
const lastWinners = require("../data/archive/last-winners");

module.exports = roundIndex => {
  return Promise.all([
    fetchS3("2018/qualifying.json"),
    fetchS3("2018/results.json")
  ]).then(response => {
    const qualifying = response[0][roundIndex] ? response[0][roundIndex] : [];
    const results = response[1][roundIndex] ? response[1][roundIndex] : [];

    let content = `${currentSeason[roundIndex].title} Grand Prix\n${moment
      .unix(currentSeason[roundIndex].ts)
      .format("MMM Do, LT")} – Round ${currentSeason[roundIndex].round}`;

    if (!size(results)) {
      content +=
        "\n\nLast Winners\n" +
        lastWinners[currentSeason[roundIndex].slug]
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
