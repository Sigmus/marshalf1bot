module.exports = data => {
  const content = Object.keys(data.results)
    .reverse()
    .map(season => `${season}. ${data.results[season][0].Driver.familyName}`)
    .join("\n");

  return `Latest ${data.raceName} winners:\n\n${content}`;
};
