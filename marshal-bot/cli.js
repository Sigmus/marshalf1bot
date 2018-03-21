var argv = require("minimist")(process.argv.slice(2));
const router = require("./router");
const s3 = require("./data/s3");
const data = require("./data/sample");

// node cli.js --cmd 'next'
// node cli.js --s3 --cmd 'drivers'

if (!argv.cmd) {
  console.log('Usage: php cli.js --cmd "something"');
  process.exit(1);
}

const printResponse = response =>
  console.log(
    typeof response === "string" ? response : JSON.stringify(response, null, 4)
  );

argv.s3
  ? s3().then(data => printResponse(router(argv.cmd, data)))
  : printResponse(router(argv.cmd, data));
