const fetchS3 = require("../data/fetch-s3");

module.exports = roundIndex => {
  return fetchS3("2018/qualifying.json").then(response => {
    const content = response[roundIndex].qualifying
      .map(
        item => `${item.pos}. ${item.driver} – ${item.q3 || item.q2 || item.q1}`
      )
      .join("\n");

    return `${response[roundIndex].title} Grand Prix Qualifying:\n\n${content}`;
  });
};
