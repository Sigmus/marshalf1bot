const argv = require("minimist")(process.argv.slice(2));
const settings = require("./settings");

if (argv.createTable) {
  settings
    .createTable()
    .then(result => console.log(result))
    .catch(err => console.log(err));
}

if (argv.insert) {
  const timestamp = new Date().getTime();
  settings
    .insert({
      timestamp,
      sender: "xpto",
      text: "938982332",
      originalRequest: { timestamp }
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
}

if (argv.fetch) {
  settings
    .fetch("xpto")
    // .then(r =>
    //   JSON.stringify(console.log(r.Items.map(x => x.originalRequest)), null, 4)
    // )
    .then(r => console.log(r))
    .catch(err => console.log(err));
}

if (argv.remove) {
  settings
    .remove("xpto")
    .then(r => console.log(r))
    .catch(err => console.log(err));
}
