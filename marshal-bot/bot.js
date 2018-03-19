const AWS = require("aws-sdk");
const botBuilder = require("claudia-bot-builder");

const s3 = new AWS.S3();

const remaining = require("./remaining");
const drivers = require("./drivers");

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
          // resolve(remaining(data));
          resolve(drivers(data));
        }
      }
    );
  });
});