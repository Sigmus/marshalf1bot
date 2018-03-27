const currentSeason = require("../data/archive/2018/season");
const latestWinners = require("../data/archive/latest-winners");

module.exports = roundIndex => {
  const data = latestWinners[currentSeason[roundIndex].slug];

  const content = data
    .reverse()
    .map(item => `${item.season}. ${item.driver}`)
    .join("\n");

  return new Promise(resolve =>
    resolve(
      `Latest ${currentSeason[roundIndex].title} Grand Prix Winners:\n\n${
        content
      }`
    )
  );
};
