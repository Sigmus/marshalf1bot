const AWS = require("aws-sdk");
const botBuilder = require("claudia-bot-builder");

const s3 = new AWS.S3();

const remaining = require("./remaining");
const drivers = require("./drivers");
const constructors = require("./constructors");
const results = require("./results");
const qualifying = require("./qualifying");
const winners = require("./winners");

module.exports = botBuilder(request => {
  return new Promise((resolve, reject) => {
    s3.getObject(
      {
        Bucket: "marshalf1bot",
        Key: "data.json"
      },
      (err, response) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const data = JSON.parse(response.Body.toString());
          const cmd = request.text.toLowerCase();
          if (cmd === "drivers") {
            return resolve(drivers(data.standings.drivers));
          }
          if (cmd === "constructors") {
            return resolve(constructors(data.standings.constructors));
          }
          if (cmd === "races") {
            return resolve(remaining(data.rounds));
          }
          if (cmd === "results") {
            return resolve(results(data.rounds[0]));
          }
          if (cmd === "qualifying") {
            return resolve(qualifying(data.rounds[0]));
          }
          if (cmd === "winners") {
            return resolve(winners(data.rounds[0]));
          }

          resolve("What?");
        }
      }
    );
  });
});
