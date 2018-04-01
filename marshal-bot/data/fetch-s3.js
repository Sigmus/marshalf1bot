const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const season = require("./season");

module.exports = Key =>
  s3
    .getObject({ Bucket: "marshalf1bot", Key: `${season.year}/${Key}` })
    .promise()
    .then(response => JSON.parse(response.Body.toString()));
