module.exports = data => {
  // const round = data.rounds[roundNumber - 1]
  const content = data.results[2017]
    .map(item => `${item.position}. ${item.Driver.familyName}`)
    .join("\n");

  return `${data.raceName} results:\n\n${content}`;
};
