const argv = require("minimist")(process.argv.slice(2));
const _ = require("lodash");

const printJson = data => console.log(JSON.stringify(data, null, 4));

const results = require("./results");

const getUniqueCircuitSlugs = () =>
  _.uniq(
    _.flatten(
      _.map(results, (races, year) => {
        return races.map(i => i.slug);
      })
    )
  );

printJson(getUniqueCircuitSlugs().length);
