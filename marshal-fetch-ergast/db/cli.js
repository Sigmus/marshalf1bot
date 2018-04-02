const argv = require("minimist")(process.argv.slice(2));
const entity = require("./entity");

if (argv.createTable) {
  entity
    .createTable()
    .then(result => console.log(result))
    .catch(err => console.log(err));
}

if (argv.insert) {
  entity
    .insert({
      endpoint: "xpto/xpto",
      payload: (timestamp = new Date().getTime())
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
}

if (argv.fetch) {
  entity
    .fetch(argv.endpoint)
    // .then(r =>
    //   JSON.stringify(console.log(r.Items.map(x => x.originalRequest)), null, 4)
    // )
    .then(r => console.log(r))
    .catch(err => console.log(err));
}

if (argv.remove) {
  entity
    .remove(argv.endpoint)
    .then(r => console.log(r))
    .catch(err => console.log(err));
}
