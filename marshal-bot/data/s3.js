const AWS = require("aws-sdk");
const s3 = new AWS.S3();

module.exports = () =>
  s3
    .getObject({ Bucket: "marshalf1bot", Key: "data.json" })
    .promise()
    .then(response => JSON.parse(response.Body.toString()));
