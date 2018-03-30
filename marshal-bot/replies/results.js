const fetchS3 = require("../data/fetch-s3");

module.exports = roundIndex => {
  return fetchS3("results.json").then(response => {
    const content = response[roundIndex].results
      .map(
        item =>
          `${item.pos}. ${item.driver} ${
            item.time ? "(" + item.time + ")" : ""
          }`
      )
      .join("\n");

    return `${response[roundIndex].title} Results:\n\n${content}`;
  });
};
