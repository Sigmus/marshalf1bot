const argv = require("minimist")(process.argv.slice(2));
const router = require("./router");

// node cli.js --cmd 'next'

if (!argv.cmd) {
  console.log('Usage: php cli.js --cmd "something"');
  process.exit(1);
}

const printResponse = response =>
  console.log(
    typeof response === "string" ? response : JSON.stringify(response, null, 4)
  );

router({
  text: argv.cmd,
  sender: "xpto",
  originalRequest: { timestamp: new Date().getTime() }
}).then(printResponse);
