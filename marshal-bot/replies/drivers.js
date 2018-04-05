const { fbTemplate } = require("claudia-bot-builder");
const db = require("marshal-db/ergast");
const season = require("marshal-seasons/season");
const settings = require("../settings");

module.exports = offset => {
  const pagesize = parseInt(settings.getKey("pagesize"));
  return db.fetchItem(`${season.year}/driverStandings`).then(data => {
    const content = data
      .slice(offset * pagesize, offset * pagesize + pagesize)
      .map(row => `${row.pos}. ${row.driver} – ${row.points}`)
      .join("\n");

    const newMessage = new fbTemplate.Text(
      `${season.year} Driver's Championship:\n\n${content}`
    );

    newMessage.addQuickReply("Constructors", "constructors");
    newMessage.addQuickReply("Next race", "next");

    return newMessage.get();
  });
};
