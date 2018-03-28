const fetchS3 = require("../data/fetch-s3");

module.exports = () => {
  return fetchS3("2018/constructorStandings.json").then(data => {
    const content = data
      .map(row => `${row.pos}. ${row.team} – ${row.points}`)
      .join("\n");

    return `2018 Constructor's Championship:\n\n${content}`;
  });
};
