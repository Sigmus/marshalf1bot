const argv = require("minimist")(process.argv.slice(2));
const ergast = require("./ergast");
const fetchRemote = require("./fetch-remote-2018");

argv.endpoint
  ? ergast(argv.endpoint).then(data =>
      console.log(JSON.stringify(data, null, 4))
    )
  : fetchRemote().then(data => console.log(JSON.stringify(data, null, 4)));
