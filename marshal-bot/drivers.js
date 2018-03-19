const moment = require("moment");

module.exports = data => {
  const content = data.standings.drivers
    .slice(0, 30)
    .map(row => `${row.position}. ${row.Driver.familyName} – ${row.points}`)
    .join("\n");

  return `2017 Driver's Championship:\n\n${content}`;
};
