module.exports = data => {
  const content = data
    .map(row => `${row.position}. ${row.Constructor.name} – ${row.points}`)
    .join("\n");

  return `2018 Constructor's Championship:\n\n${content}`;
};
