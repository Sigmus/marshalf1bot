const searchNewQualifyings = (current, previous) => {
  const previousOutstandingRoundSlugs = previous.rounds
    .filter(i => !i.qualifying.length)
    .map(i => i.slug);

  const roundsToCheck = current.rounds.filter(
    i => previousOutstandingRoundSlugs.indexOf(i.slug) !== -1
  );

  roundsToCheck.forEach(
    i =>
      i.qualifying.length &&
      console.log(`Found new qualifying results for ${i.slug}`)
  );
};

module.exports = (current, previous) => {
  return new Promise((resolve, reject) => {
    searchNewQualifyings(current, previous);
    resolve({});
  });
};
