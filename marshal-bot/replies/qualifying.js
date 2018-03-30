const { fbTemplate } = require("claudia-bot-builder");
const size = require("lodash/size");
const fetchS3 = require("../data/fetch-s3");

module.exports = roundIndex => {
  return Promise.all([
    fetchS3("qualifying.json"),
    fetchS3("results.json")
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

    return obj.get();
  });
};
