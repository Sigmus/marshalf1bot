const argv = require("minimist")(process.argv.slice(2));
const ergast = require("./ergast");
const refresh = require("./refresh");

const printJson = data => console.log(JSON.stringify(data, null, 4));

if (argv.refresh) {
  refresh("2018").then(printJson);
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
