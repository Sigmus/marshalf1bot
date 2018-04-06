const argv = require("minimist")(process.argv.slice(2));
const parse = require("./parse");
const sample = require("./event-sample");

if (argv.parse) {
  const payloads = parse(sample);
  console.log(payloads);
}
