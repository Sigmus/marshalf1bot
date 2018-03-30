const { fbTemplate } = require("claudia-bot-builder");
const fetchS3 = require("../data/fetch-s3");
const currentYear = require("../data/current-year");

module.exports = () => {
  return fetchS3("constructorStandings.json").then(data => {
    const content = data
      .map(row => `${row.pos}. ${row.team} – ${row.points}`)
      .join("\n");

    const newMessage = new fbTemplate.Text(
      `${currentYear} Constructor's Championship:\n\n${content}`
    );

    newMessage.addQuickReply("Drivers", "drivers");

    return newMessage.get();
  });
};
