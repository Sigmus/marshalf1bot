const argv = require("minimist")(process.argv.slice(2));
const router = require("./router");
const processConvesation = require("./process-conversation");

if (!argv.cmd) {
  console.log('Usage: php cli.js --cmd "something"');
  process.exit(1);
}

const message = {
  text: argv.cmd,
  sender: "xpto",
  originalRequest: { timestamp: new Date().getTime() }
};

processConvesation(message).then(previousMessage => {
  router(message, previousMessage).then(response =>
    console.log(
      typeof response === "string"
        ? response
        : JSON.stringify(response, null, 4)
    )
  );
});
