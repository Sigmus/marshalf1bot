const { fbTemplate } = require("claudia-bot-builder");
const db = require("../db/ergast");
const season = require("../data/season");

module.exports = () => {
  return db.fetchItem(`${season.year}/constructorStandings`).then(data => {
    const content = data
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
