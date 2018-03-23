const AWS = require("aws-sdk");
const s3 = new AWS.S3();

module.exports = () => {
  const Bucket = "marshalf1bot";
  const Key = "data.json";

  return new Promise((resolve, reject) => {
    s3.listObjectVersions({ Bucket, Prefix: Key }, (err, data) => {
      if (err) {
        return reject(err);
      }

      if (data.Versions.length < 2) {
        return reject({ message: "nothing-to-compare" });
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
        resolve({
          current: res[0].Body.toString(),
          previous: res[1].Body.toString()
        });
      });
    });
  });
};
