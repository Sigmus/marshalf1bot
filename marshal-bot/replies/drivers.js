const { fbTemplate } = require("claudia-bot-builder");
const db = require("../db/ergast");
const season = require("../data/season");

module.exports = () => {
  return db.fetchItem(`${season.year}/driverStandings`).then(data => {
    const content = data
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


