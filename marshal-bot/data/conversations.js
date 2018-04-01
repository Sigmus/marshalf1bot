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

module.exports = { fetch };
