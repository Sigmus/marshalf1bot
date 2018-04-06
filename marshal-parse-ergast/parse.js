const sha1 = require("sha1");
const db = require("marshal-db/ergast");

module.exports = data => {
  db
    .fetch("2018/constructorStandings", 2)
    .then(response =>
      response.Items.map(i => {
        return {
          timestamp: i.timestamp,
          checksum: sha1(i.data)
        };
      })
    )
    .then(results => compare(results[0], results[1]));
};

const compare = (current, previous) => {
  console.log("current", current);
  console.log("previous", previous);
  process.exit(1);
};
