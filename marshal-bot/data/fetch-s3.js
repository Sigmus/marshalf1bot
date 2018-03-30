const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const currentYear = "2018";

module.exports = Key =>
  s3
    .getObject({ Bucket: "marshalf1bot", Key: `${currentYear}/${Key}` })
    .promise()
    .then(response => JSON.parse(response.Body.toString()));
