const currentSeason = require("../data/archive/2018/season");

const moment = require("moment");

module.exports = sliceIndex =>
  new Promise(resolve => {
    const content = currentSeason
      .slice(sliceIndex, currentSeason.length)
      .map(
        row =>
          `${row.round}. ${row.title}, ${moment.unix(row.ts).format("MMM Do")}`
      )
      .join("\n");

    resolve(
      `${sliceIndex === 0 ? "" : "Remaining "}2018 rounds:\n\n${content}`
    );
  });
