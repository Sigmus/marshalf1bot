const moment = require("moment");

module.exports = data => {
  const content = data
    .map(
      row =>
        `${row.round}. ${row.title}, ${moment.unix(row.ts).format("MMM Do")}`
    )
    .join("\n");

  return `Remaining 2018 rounds:\n\n${content}`;
};
