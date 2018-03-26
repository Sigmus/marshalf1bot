const argv = require("minimist")(process.argv.slice(2));
const ergast = require("./ergast");
const fetchRemote = require("./fetch-remote-2018");

if (argv.endpoint) {
  ergast
    .endpoint(argv.endpoint)
    .then(data => console.log(JSON.stringify(data, null, 4)));
}

if (argv.driverStandings) {
  ergast
    .driverStandings(argv.driverStandings)
    .then(data => console.log(JSON.stringify(data, null, 4)));
}

if (argv.constructorStandings) {
  ergast
    .constructorStandings(argv.constructorStandings)
    .then(data => console.log(JSON.stringify(data, null, 4)));
}

if (argv.qualifying) {
  ergast
    .qualifying(argv.qualifying)
    .then(data => console.log(JSON.stringify(data, null, 4)));
}

if (argv.results) {
  ergast
    .results(argv.results)
    .then(data => console.log(JSON.stringify(data, null, 4)));
}

// : fetchRemote().then(data => console.log(JSON.stringify(data, null, 4)));
