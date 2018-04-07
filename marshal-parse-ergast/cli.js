const argv = require("minimist")(process.argv.slice(2));
const parse = require("./parse");

// node cli.js --key 2018/constructorStandings
// node cli.js --key 2018/driverStandings
// node cli.js --key 2018/results
// node cli.js --key 2018/qualifying

if (argv.key) {
  parse(argv.key).then(x => console.log(x));
}
