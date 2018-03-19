const moment = require("moment");

module.exports = data => {
  const content = data.rounds
    .slice(0, 30)
    .map(
      row =>
        `${row.round}. ${row.title}, ${moment.unix(row.ts).format("MMM Do")}`
    )
    .join("\n");

  return `Remaining 2017 rounds:\n\n${content}`;
};
