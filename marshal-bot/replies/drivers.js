const { fbTemplate } = require("claudia-bot-builder");
const fetchS3 = require("../data/fetch-s3");
const season = require("../data/season");

module.exports = () => {
  return fetchS3("driverStandings.json").then(data => {
    const content = data
      .map(row => `${row.pos}. ${row.driver} – ${row.points}`)
      .join("\n");

    const newMessage = new fbTemplate.Text(
      `${season.year} Driver's Championship:\n\n${content}`
    );

    newMessage.addQuickReply("Constructors", "constructors");

    return newMessage.get();
  });
};


