const broadcast = require("./broadcast");

const currentYear = 2018;

const qualifyingResults = (current, previous) => {
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

const raceResults = (current, previous) => {
  const previousOutstandingRoundSlugs = previous.rounds
    .filter(i => !i.results[currentYear])
    .map(i => i.slug);

  const roundsWithNewResults = current.rounds.filter(
    i =>
      previousOutstandingRoundSlugs.indexOf(i.slug) !== -1 &&
      i.results[currentYear]
  );

  return Promise.all(
    roundsWithNewResults.map(i => broadcast(`results ${i.slug}`))
  );
};

module.exports = (current, previous) => {
  return qualifyingResults(current, previous).then(() =>
    raceResults(current, previous)
  );
};
