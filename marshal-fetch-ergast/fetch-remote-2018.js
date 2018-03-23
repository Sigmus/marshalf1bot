const moment = require("moment");
const _ = require("lodash");
const ergast = require("./ergast");

const season2018 = require("./past/season2018.json");
const results2017 = require("./past/results2017.json");
const results2016 = require("./past/results2016.json");
const results2015 = require("./past/results2015.json");
const results2014 = require("./past/results2014.json");
const results2013 = require("./past/results2013.json");

module.exports = () => {
  return Promise.all([
    ergast("2018/driverStandings").then(x => {
      if (!x.MRData.StandingsTable.StandingsLists.length) {
        return [];
      }
      return x.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    }),
    ergast("2018/constructorStandings").then(x => {
      if (!x.MRData.StandingsTable.StandingsLists.length) {
        return [];
      }
      return x.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    }),
    ergast("2018/qualifying", { limit: 10000 }),
    ergast("2018/results", { limit: 10000 })
  ]).then(([drivers, constructors, qualifying, results2018]) => {
    const rounds = season2018.MRData.RaceTable.Races.map((item, index) => {
      item.title = item.raceName.replace(" Grand Prix", "");
      item.slug = _.kebabCase(item.title);
      item.ts = moment(`${item.date}T${item.time}`).unix();
      item.results = {};
      item.qualifying = qualifying.MRData.RaceTable.Races[index]
        ? qualifying.MRData.RaceTable.Races[index].QualifyingResults
        : [];
      return item;
    });

    [
      results2018,
      results2017,
      results2016,
      results2015,
      results2014,
      results2013
    ].forEach(result => {
      result.MRData.RaceTable.Races.forEach(item => {
        const { circuitId } = item.Circuit;
        const round = rounds.filter(x => x.Circuit.circuitId === circuitId)[0];
        if (_.isUndefined(round)) {
          return;
        }
        // Innject results
        round.results[item.season] = item.Results;
      });
    });

    data = { rounds, standings: { drivers, constructors } };

    return data;
  });
};
