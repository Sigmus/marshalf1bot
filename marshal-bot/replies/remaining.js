const currentSeason = require("../data/archive/2018/season");

const moment = require("moment");

module.exports = () =>
  new Promise(resolve => {
    const content = currentSeason
      .map(
        row =>
          `${row.round}. ${row.title}, ${moment.unix(row.ts).format("MMM Do")}`
      )
      .join("\n");

    resolve(`Remaining 2018 rounds:\n\n${content}`);
  });
