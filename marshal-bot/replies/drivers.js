const fetchS3 = require("../data/fetch-s3");

module.exports = data => {
  return fetchS3("2018/driverStandings.json").then(data => {
    const content = data
      .map(row => `${row.position}. ${row.Driver.familyName} – ${row.points}`)
      .join("\n");

    return `2018 Driver's Championship:\n\n${content}`;
  });
};
