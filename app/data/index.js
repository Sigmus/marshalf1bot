const _ = require( 'lodash');
const request = require('request');
const moment = require('moment');

const season2017 = require('./season2017.json');
const results2016 = require('./results2016.json');
const results2015 = require('./results2015.json');
const results2014 = require('./results2014.json');
const results2013 = require('./results2013.json');

let data;

const promise =Promise.all([

  ergast('2017/driverStandings')
    .then(x => x.MRData.StandingsTable.StandingsLists[0].DriverStandings),
  ergast('2017/constructorStandings')
    .then(x => x.MRData.StandingsTable.StandingsLists[0].ConstructorStandings),
  ergast('2017/qualifying', {limit: 10000}),
  ergast('2017/results', {limit: 10000})

  ]).then(([drivers, constructors, qualifying, results2017]) => {

    const rounds = season2017.MRData.RaceTable.Races.map((item, index) => {
      item.title = item.raceName.replace(' Grand Prix', '');
      item.slug = _.kebabCase(item.title);
      item.ts = moment(`${item.date}T${item.time}`).unix();
      item.results = {};
      item.qualifying = qualifying.MRData.RaceTable.Races[index]
        ? qualifying.MRData.RaceTable.Races[index].QualifyingResults
        : [];
      return item;
    });

    [results2017, results2016, results2015, results2014, results2013].forEach((result) => {
      result.MRData.RaceTable.Races.forEach((item) => {
        const {circuitId} = item.Circuit;
        const round = rounds.filter((x) => x.Circuit.circuitId === circuitId)[0];
        if (_.isUndefined(round)) {
          return;
        }
        // Innject results
        round.results[item.season] = item.Results;
      });
    })

    data = {
      rounds,
      standings: {
        drivers,
        constructors
      }
    };

    return data;

  });


/*
 * Return a promise of an JSON API request
 */
function ergast(path, qs = {}) {
  return new Promise((resolve, reject) => {
    request({
      uri: `http://ergast.com/api/f1/${path}.json`,
      qs,
      method: 'GET'
    }, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        reject(response.body);
        return;
      }
      resolve(JSON.parse(response.body));
    });
  });
}


if (require.main === module) {
  promise
    .then((response) => {
      console.log(JSON.stringify(response, null, 4));
      process.exit(0);
    })
    .catch((response) => {
      console.log(response);
      process.exit(1);
    })
}


function getNextRounds() {
  const now = moment().unix();
  return data.rounds.filter((item, index) => {
    return item.ts > now;
  });
}


module.exports =  {

  getNextRounds,

  getLastRoundNumber() {
    const nextRound = parseInt(getNextRounds()[0].round);
    return nextRound - 1;
  },

  getRound(roundNumber) {
    return data.rounds[roundNumber - 1];
  },

  getDrivers() {
    return data.standings.drivers;
  },

  getConstructors() {
    return data.standings.constructors;
  },

  all() {
    return data;
  }

};

