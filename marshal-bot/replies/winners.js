const season = require("marshal-seasons/season");
const lastWinners = require("marshal-seasons/archive/last-winners");

module.exports = roundIndex => {
  const data = lastWinners[season.data[roundIndex].slug];

  const content = data
    .reverse()
    .map(item => `${item.season}. ${item.driver}`)
    .join("\n");

  return new Promise(resolve =>
    resolve(
      `Last ${season.data[roundIndex].title} Grand Prix Winners:\n\n${content}`
    )
  );
};
