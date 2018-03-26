const request = require("request");

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
        position: i.position,
        points: i.points,
        Driver: { familyName: i.Driver.familyName }
      };
    })
  );
};

const constructorStandings = year => {
  return endpoint(`${year}/constructorStandings`).then(response =>
    response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(
      i => {
        return {
          position: i.position,
          points: i.points,
          Constructor: { name: i.Constructor.name }
        };
      }
    )
  );
};

module.exports = { endpoint, constructorStandings };
