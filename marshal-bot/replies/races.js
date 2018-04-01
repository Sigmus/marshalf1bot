const moment = require("moment");
const season = require("../data/season");

module.exports = sliceIndex =>
  new Promise(resolve => {
    const content = season.data
      .slice(sliceIndex, season.data.length)
      .map(
        row =>
          `${row.round}. ${row.title}, ${moment.unix(row.ts).format("MMM Do")}`
      )
      .join("\n");

    resolve(
      `${sliceIndex === 0 ? "" : "Remaining "}${season.year} rounds:\n\n${
        content
      }`
    );
  });
