const argv = require("minimist")(process.argv.slice(2));
const _ = require("lodash");

const printJson = data => console.log(JSON.stringify(data, null, 4));

const results = require("./results");

const getUniqueCircuitSlugs = () =>
  _.uniq(
    _.flatten(
      _.map(results, (races, season) => {
        return races.map(i => i.circuit);
      })
    )
  );

const filterByCircuit = circuit => {
  return _.map(results, (races, season) => {
    return races.filter(i => i.circuit === circuit).map(i => {
      i.season = season;
      return i;
    });
  });
};

if (argv.getUniqueCircuitSlugs) {
  printJson(getUniqueCircuitSlugs().length);
}

if (argv.filterByCircuit) {
  printJson(filterByCircuit(argv.filterByCircuit));
}
