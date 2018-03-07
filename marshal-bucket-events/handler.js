const AWS = require("aws-sdk");

const s3 = new AWS.S3();

const compare = require("./compare");

module.exports.hello = (event, context, callback) => {
  const Bucket = "marshalf1bot";
  const Key = "data.json";

  s3.listObjectVersions({ Bucket, Prefix: Key }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    if (data.Versions.length < 2) {
      callback(null, { message: "nothing-to-compare" });
      return;
    }

    const versions = data.Versions.slice(0, 2).map(i => i.VersionId);

    const latestVersionPromise = s3
      .getObject({
        Bucket,
        Key,
        VersionId: versions[0]
      })
      .promise();

    const previousVersionPromise = s3
      .getObject({
        Bucket,
        Key,
        VersionId: versions[1]
      })
      .promise();

    Promise.all([latestVersionPromise, previousVersionPromise]).then(res => {
      compare(res[0].Body.toString(), res[1].Body.toString()).then(message =>
        callback(null, { message })
      );
    });
  });
};
