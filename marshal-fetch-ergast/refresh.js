const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const ergast = require("./ergast");

module.exports = year =>
  Promise.all([
    copyData(year, "driverStandings"),
    copyData(year, "constructorStandings"),
    copyData(year, "qualifying"),
    copyData(year, "results")
  ]);

const copyData = (year, name) =>
  ergast[name](year).then(data => putObject(`${year}/${name}.json`, data));

const putObject = (Key, data) =>
  s3
    .putObject({
      Bucket: "marshalf1bot",
      Key,
      Body: JSON.stringify(data),
      ACL: "public-read"
    })
    .promise();
