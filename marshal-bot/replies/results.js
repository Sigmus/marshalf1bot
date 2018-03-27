const fetchS3 = require("../data/fetch-s3");

module.exports = roundIndex => {
  return fetchS3("2018/results.json").then(response => {
    const content = response[roundIndex].results
      .map(
        item =>
          `${item.position}. ${item.Driver.familyName} ${
            item.Time ? "(" + item.Time.time + ")" : ""
          }`
      )
      .join("\n");

    return `${response[roundIndex].title} Results:\n\n${content}`;
  });
};
