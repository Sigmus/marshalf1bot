const fetchRemote = require("./fetch-remote-2018");
const AWS = require("aws-sdk");

const s3 = new AWS.S3();

module.exports.refresh = (event, context, callback) =>
  fetchRemote().then(data =>
    s3
      .putObject({
        Bucket: "marshalf1bot",
        Key: "data.json",
        Body: JSON.stringify(data),
        ACL: "public-read"
      })
      .promise()
      .then(() => callback(null, { message: "data-refreshed" }))
      .catch(err => console.log(err))
  );
