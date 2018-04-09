const sha1 = require("sha1");
const db = require("marshal-db/ergast");

module.exports = (key, limit = 2) => {
  return db
    .fetch(key, limit)
    .then(response =>
      response.Items.map(i => {
        return {
          timestamp: i.timestamp,
          checksum: sha1(i.data)
        };
      })
    )
    .then(results => {
      return {
        key,
        results,
        areDifferent: results[0].checksum !== results[1].checksum
      };
    });
};
