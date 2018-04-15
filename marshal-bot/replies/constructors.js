const { fbTemplate } = require("claudia-bot-builder");
const db = require("marshal-db/ergast");
const season = require("marshal-seasons/season");
const settings = require("../settings");

module.exports = offset => {
  const pagesize = parseInt(settings.getKey("pagesize"));

  return db.fetchItem(`${season.year}/constructorStandings`).then(data => {
    const total = data.length;
    const startpos = offset * pagesize;
    const endpos = offset * pagesize + pagesize;

    const content = data
      .slice(startpos, endpos)
      .map(row => `${row.pos}. ${row.team} – ${row.points}`)
      .join("\n");

    const newMessage = new fbTemplate.Text(
      `${season.year} Constructor's Championship:\n\n${content}`
    );

    if (endpos < total) {
      newMessage.addQuickReply(
        `+${total - endpos > pagesize ? pagesize : total - endpos}`,
        `drivers ${parseInt(offset, 10) + 1}`
      );
    }

    newMessage.addQuickReply("Drivers", "drivers");
    newMessage.addQuickReply("Next race", "next");

    return newMessage.get();
  });
};
