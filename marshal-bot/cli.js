var argv = require("minimist")(process.argv.slice(2));

const router = require("./router");
const data = require("./data");

// node cli.js --cmd 'next'
// node cli.js --cmd 'drivers'

if (!argv.cmd) {
  console.log('Usage: php cli.js --cmd "something"');
  process.exit(1);
}

const response = router(argv.cmd, data);

console.log(
  typeof response === "string" ? response : JSON.stringify(response, null, 4)
);
