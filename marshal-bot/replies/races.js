const moment = require("moment");
const currentSeason = require("../data/current-season");
const currentYear = require("../data/current-year");

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
      `${sliceIndex === 0 ? "" : "Remaining "}${currentYear} rounds:\n\n${
        content
      }`
    );
  });
