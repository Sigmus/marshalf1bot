var argv = require("minimist")(process.argv.slice(2));

const router = require("./router");
const data = require("./data");

// node test.js --cmd 'next'
// node test.js --cmd 'drivers'

if (!argv.cmd) {
  console.log("Usage: php test.js --cmd something");
  process.exit(1);
}

const response = router(argv.cmd, data);

console.log(
  typeof response === "string" ? response : JSON.stringify(response, null, 4)
);
