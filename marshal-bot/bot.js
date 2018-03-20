const AWS = require("aws-sdk");
const botBuilder = require("claudia-bot-builder");

const s3 = new AWS.S3();

const remaining = require("./remaining");
const drivers = require("./drivers");
const constructors = require("./constructors");
const results = require("./results");
const qualifying = require("./qualifying");
const winners = require("./winners");
const round = require("./round");

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
          let aux;
          console.log("cmd", cmd);
          if (cmd === "drivers") {
            return resolve(drivers(data.standings.drivers));
          }
          if (cmd === "constructors") {
            return resolve(constructors(data.standings.constructors));
          }
          if (cmd === "races") {
            return resolve(remaining(data.rounds));
          }

          aux = cmd.split("results");
          if (aux.length === 2) {
            return resolve(results(data.rounds[parseInt(aux[1])]));
          }

          aux = cmd.split("qualifying");
          if (aux.length === 2) {
            return resolve(qualifying(data.rounds[parseInt(aux[1])]));
          }

          if (cmd === "winners") {
            return resolve(winners(data.rounds[0]));
          }

          if (cmd === "next") {
            return resolve(round(data.rounds[0]));
          }

          resolve("What?");
        }
      }
    );
  });
});
