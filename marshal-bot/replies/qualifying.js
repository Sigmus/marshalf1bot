const fetchS3 = require("../data/fetch-s3");
const currentSeason = require("../data/archive/2018/season");

module.exports = roundIndex => {
  return fetchS3("2018/qualifying.json").then(response => {
    const content = response[roundIndex]
      .map(
        item =>
          `${item.position}. ${item.Driver.familyName} – ${item.Q3 ||
            item.Q2 ||
            item.Q1}`
      )
      .join("\n");

    return `${currentSeason[roundIndex].title} Qualifying:\n\n${content}`;
  });
};
