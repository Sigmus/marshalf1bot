module.exports = data => {
  const content = data
    .map(row => `${row.position}. ${row.Driver.familyName} – ${row.points}`)
    .join("\n");

  return `2018 Driver's Championship:\n\n${content}`;
};
