const { fbTemplate } = require("claudia-bot-builder");
const size = require("lodash/size");
const moment = require("moment");
const fetchS3 = require("../data/fetch-s3");
const currentSeason = require("../data/archive/2018/season");

module.exports = roundIndex => {
  return Promise.all([
    fetchS3("2018/qualifying.json"),
    fetchS3("2018/results.json")
  ]).then(response => {
    const qualifying = response[0][roundIndex] ? response[0][roundIndex] : [];
    const results = response[1][roundIndex] ? response[1][roundIndex] : [];

    const obj = new fbTemplate.Button(
      `${currentSeason[roundIndex].title}\n${moment
        .unix(currentSeason[roundIndex].ts)
        .format("MMM Do, LT")} – Round ${currentSeason[roundIndex].round}`
    );

    if (size(qualifying) > 0) {
      obj.addButton("Qualifying", `qualifying ${roundIndex + 1}`);
    }

    if (size(results) > 0) {
      obj.addButton("Race Results", `results ${roundIndex + 1}`);
    } else {
      obj.addButton("Latest Winners", `winners ${roundIndex + 1}`);
    }

    obj.addButton("Remaining races", "remaining");

    return obj.get();
  });
};
