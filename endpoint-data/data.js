const moment = require("moment");
const _ = require("lodash");
const AWS = require("aws-sdk");

const season2017 = require("./season2017.json");
const results2017 = require("./results2017.json");
const results2016 = require("./results2016.json");
const results2015 = require("./results2015.json");
const results2014 = require("./results2014.json");
const results2013 = require("./results2013.json");

const ergast = require("./ergast");

const s3 = new AWS.S3();

module.exports = () => {
  return Promise.all([
    ergast("2017/driverStandings").then(
      x => x.MRData.StandingsTable.StandingsLists[0].DriverStandings
    ),
    ergast("2017/constructorStandings").then(
      x => x.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
    ),
    ergast("2017/qualifying", { limit: 10000 }),
    ergast("2017/results", { limit: 10000 })
  ]).then(([drivers, constructors, qualifying, results2017]) => {
    const rounds = season2017.MRData.RaceTable.Races.map((item, index) => {
      item.title = item.raceName.replace(" Grand Prix", "");
      item.slug = _.kebabCase(item.title);
      item.ts = moment(`${item.date}T${item.time}`).unix();
      item.results = {};
      item.qualifying = qualifying.MRData.RaceTable.Races[index]
        ? qualifying.MRData.RaceTable.Races[index].QualifyingResults
        : [];
      return item;
    });

    [results2017, results2016, results2015, results2014, results2013].forEach(
      result => {
        result.MRData.RaceTable.Races.forEach(item => {
          const { circuitId } = item.Circuit;
          const round = rounds.filter(
            x => x.Circuit.circuitId === circuitId
          )[0];
          if (_.isUndefined(round)) {
            return;
          }
          // Innject results
          round.results[item.season] = item.Results;
        });
      }
    );

    data = { rounds, standings: { drivers, constructors } };

    const params = { Bucket: "marshalf1bot", Key: "data.json" };

    const writeFile = Body =>
      new Promise((resolve, reject) => {
        params.Body = Body;
        s3.putObject(params, err => {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully uploaded data to myBucket/myKey");
            resolve(data);
          }
        });
      });

    const readFile = () =>
      new Promise((resolve, reject) => {
        s3.getObject(params, (err, _data) => {
          if (err) {
            console.log(err);
          } else {
            const diff = moment().diff(moment(_data.LastModified), "minutes");
            console.log("diff", diff);
            if (diff > 2) {
              writeFile(JSON.stringify(data, null, 4)).then(() =>
                resolve(data)
              );
            } else {
              resolve(data);
            }
          }
        });
      });

    return readFile();
  });
};
