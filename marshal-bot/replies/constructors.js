const { fbTemplate } = require("claudia-bot-builder");
const db = require("marshal-db/ergast");
const season = require("marshal-seasons/season");
const settings = require("../settings");

module.exports = offset => {
  return db.fetchItem(`${season.year}/constructorStandings`).then(data => {
    const content = data
      .slice(offset, offset + parseInt(settings.getKey("pagesize")))
      .map(row => `${row.pos}. ${row.team} – ${row.points}`)
      .join("\n");

    const newMessage = new fbTemplate.Text(
      `${season.year} Constructor's Championship:\n\n${content}`
    );

    newMessage.addQuickReply("Drivers", "drivers");
    newMessage.addQuickReply("Next race", "next");

    return newMessage.get();
  });
};
