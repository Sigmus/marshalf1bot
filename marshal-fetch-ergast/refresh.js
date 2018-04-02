const ergast = require("./ergast");
const db = require("marshal-db/ergast");

module.exports = year =>
  Promise.all([
    copyData(year, "driverStandings"),
    copyData(year, "constructorStandings"),
    copyData(year, "qualifying"),
    copyData(year, "results")
  ]);

const copyData = (year, name) =>
  ergast[name](year).then(data =>
    db.insert({
      endpoint: `${year}/${name}`,
      timestamp: new Date().getTime(),
      data: JSON.stringify(data)
    })
  );
