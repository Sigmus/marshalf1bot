module.exports = data => {
  const content = data.results[2017]
    .map(
      item =>
        `${item.position}. ${item.Driver.familyName} ${
          item.Time ? "(" + item.Time.time + ")" : ""
        }`
    )
    .join("\n");

  return `${data.raceName} results:\n\n${content}`;
};
