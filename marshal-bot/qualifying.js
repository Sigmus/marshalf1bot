module.exports = data => {
  // const round = data.rounds[roundNumber - 1]
  const content = data.qualifying
    .map(
      item =>
        `${item.position}. ${item.Driver.familyName} – ${item.Q3 ||
          item.Q2 ||
          item.Q1}`
    )
    .join("\n");

  return `${data.raceName} Qualifying:\n\n${content}`;
};
