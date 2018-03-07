const fetchRemote = require("./fetch-remote");
const AWS = require("aws-sdk");

const s3 = new AWS.S3();

module.exports.refresh = (event, context, callback) => {
  fetchRemote().then(() =>
    s3.putObject(
      {
        Bucket: "marshalf1bot",
        Key: "data.json",
        Body: JSON.stringify(data),
        ACL: "public-read"
      },
      err =>
        err
          ? console.log(err)
          : callback(null, { message: "data-refreshed", event })
    )
  );
};
