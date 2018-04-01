const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const fetch = sender =>
  s3
    .getObject({ Bucket: "marshalf1bot", Key: `conversations/${sender}.json` })
    .promise()
    .then(response => JSON.parse(response.Body.toString()))
    .catch(err => {
      return { conversations: [] };
    });

const insert = (sender, data) =>
  s3
    .putObject({
      Bucket: "marshalf1bot",
      Key: `conversations/${sender}.json`,
      Body: JSON.stringify(data),
      ACL: "public-read"
    })
    .promise();

module.exports = { fetch, insert };
