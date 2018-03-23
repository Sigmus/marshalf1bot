const argv = require("minimist")(process.argv.slice(2));
const compare = require("./compare");
const current = require("./data/current");
const previous = require("./data/previous");
const fetchCurrentAndPrevious = require("./fetch-current-and-previous");

if (argv.s3) {
  fetchCurrentAndPrevious().then(response => {
    compare(response.current, response.previous).then(response =>
      console.log(response)
    );
  });
} else {
  compare(JSON.stringify(current), JSON.stringify(previous))
    .then(response => console.log(response))
    .catch(err => console.log(err));
}
