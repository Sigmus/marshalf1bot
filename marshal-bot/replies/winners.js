const currentSeason = require("../data/current-season");
const lastWinners = require("../data/archive/last-winners");

module.exports = roundIndex => {
  const data = lastWinners[currentSeason[roundIndex].slug];

  const content = data
    .reverse()
    .map(item => `${item.season}. ${item.driver}`)
    .join("\n");

  return new Promise(resolve =>
    resolve(
      `Last ${currentSeason[roundIndex].title} Grand Prix Winners:\n\n${
        content
      }`
    )
  );
};
