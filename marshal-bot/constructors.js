const moment = require("moment");

module.exports = data => {
  const content = data
    .map(row => `${row.position}. ${row.Constructor.name} – ${row.points}`)
    .join("\n");

  return `2017 Constructor's Championship:\n\n${content}`;
};
