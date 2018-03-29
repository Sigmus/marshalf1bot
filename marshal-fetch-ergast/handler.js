const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const ergast = require("./ergast");

const year = "2018";

const copyData = name =>
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

module.exports.refresh = (event, context, callback) => {
  Promise.all([
    copyData("driverStandings"),
    copyData("constructorStandings"),
    copyData("qualifying"),
    copyData("results")
  ])
    .then(() => callback(null, { message: "data-refreshed" }))
    .catch(err => console.log(err));
};
