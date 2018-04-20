const _ = require("lodash");
const moment = require("moment");
const request = require("request");

const title = raceName => raceName.replace(" Grand Prix", "");
const slug = raceName => _.kebabCase(title(raceName));

/*
 * Return a promise of an JSON API request
 */
const endpoint = (path, qs = { limit: 1000 }) => {
  return new Promise((resolve, reject) => {
    request(
      {
        uri: `http://ergast.com/api/f1/${path}.json`,
        qs,
        method: "GET"
      },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          reject(response.body);
          return;
        }
        resolve(JSON.parse(response.body));
      }
    );
  });
};

const driverStandings = year => {
  return endpoint(`${year}/driverStandings`).then(response =>
    response.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(i => {
      return {
        pos: i.position,
        points: i.points,
        driver: i.Driver.familyName
      };
    })
  );
};

const constructorStandings = year => {
  return endpoint(`${year}/constructorStandings`).then(response =>
    response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(
      i => {
        return {
          pos: i.position,
          points: i.points,
          team: i.Constructor.name
        };
      }
    )
  );
};

const qualifying = year => {
  return endpoint(`${year}/qualifying`).then(response =>
    response.MRData.RaceTable.Races.map(i => {
      return {
        title: title(i.raceName),
        slug: slug(i.raceName),
        qualifying: i.QualifyingResults.map(j => {
          return {
            pos: j.position,
            q1: j.Q1,
            q2: j.Q2,
            q3: j.Q3,
            driver: j.Driver.familyName
          };
        })
      };
    })
  );
};

const results = year => {
  return endpoint(`${year}/results`).then(response =>
    response.MRData.RaceTable.Races.map(i => {
      return {
        title: title(i.raceName),
        slug: slug(i.raceName),
        circuit: i.Circuit.circuitId,
        results: i.Results.map(j => {
          const result = {
            pos: j.position,
            driver: j.Driver.familyName
          };
          if (j.Time) {
            result.time = j.Time.time;
          }
          return result;
        })
      };
    })
  );
};

const season = year => {
  return endpoint(`${year}`).then(response => {
    return response.MRData.RaceTable.Races.map(i => {
      return {
        round: i.round,
        title: title(i.raceName),
        slug: slug(i.raceName),
        ts: moment(`${i.date}T${i.time}`).unix()
      };
    });
  });
};

module.exports = {
  endpoint,
  constructorStandings,
  driverStandings,
  qualifying,
  results,
  season
};
