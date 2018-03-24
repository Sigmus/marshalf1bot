const broadcast = require("./broadcast");

const searchNewQualifyings = (current, previous) => {
  const previousOutstandingRoundSlugs = previous.rounds
    .filter(i => !i.qualifying.length)
    .map(i => i.slug);

  const roundsWithNewResults = current.rounds.filter(
    i =>
      previousOutstandingRoundSlugs.indexOf(i.slug) !== -1 &&
      i.qualifying.length
  );

  return Promise.all(
    roundsWithNewResults.map(i => broadcast(`qualifying ${i.slug}`))
  );
};

module.exports = (current, previous) => {
  return searchNewQualifyings(current, previous);
};

