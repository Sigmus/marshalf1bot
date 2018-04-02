const { fbTemplate } = require("claudia-bot-builder");
const moment = require("moment");
const season = require("marshal-seasons/season");

module.exports = sliceIndex =>
  new Promise(resolve => {
    const content = season.data
      .slice(sliceIndex, season.data.length)
      .map(
        row =>
          `${row.round}. ${row.title}, ${moment.unix(row.ts).format("MMM Do")}`
      )
      .join("\n");

    const newMessage = new fbTemplate.Text(
      `${sliceIndex === 0 ? "" : "Remaining "}${season.year} rounds:\n\n${
        content
      }`
    );

    newMessage.addQuickReply("Last Results", "last results");

    resolve(newMessage.get());
  });
