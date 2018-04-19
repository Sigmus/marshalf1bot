const argv = require("minimist")(process.argv.slice(2));
const ergast = require("./ergast");
const refresh = require("./refresh");
const season = require("marshal-seasons/season");
const range = require("lodash/range");

const printJson = data => console.log(JSON.stringify(data, null, 4));

if (argv.refresh) {
  refresh(season.year).then(printJson);
}

if (argv.endpoint) {
  ergast.endpoint(argv.endpoint).then(printJson);
}

if (argv.driverStandings) {
  ergast.driverStandings(argv.driverStandings).then(printJson);
}

if (argv.constructorStandings) {
  ergast.constructorStandings(argv.constructorStandings).then(printJson);
}

if (argv.qualifying) {
  ergast.qualifying(argv.qualifying).then(printJson);
}

if (argv.results) {
  ergast.results(argv.results).then(printJson);
}

if (argv.season) {
  ergast.season(argv.season).then(printJson);
}

if (argv.range) {
  const years = range(argv.start, argv.end + 1);
  Promise.all(years.map(y => ergast[argv.range](y)))
    .then(results =>
      results.reduce((acc, next, index) => {
        acc[years[index]] = next;
        return acc;
      }, {})
    )
    .then(printJson);
}
