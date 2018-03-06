const AWS = require("aws-sdk");

const s3 = new AWS.S3();

// We don't actually need to read anymore
const readObject = (params, fetcher) =>
  new Promise((resolve, reject) => {
    s3.getObject(params, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      fetcher(JSON.parse(res.Body.toString("utf-8"))).then(data => {
        writeObject(params, data).then(() => resolve("data-refreshed"));
      });
    });
  });

const writeObject = (params, data) =>
  new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: params.Bucket,
        Key: params.Key,
        Body: JSON.stringify(data),
        ACL: "public-read"
      },
      err => {
        if (err) {
          console.log(err);
          return;
        }
        resolve(data);
      }
    );
  });

module.exports = { readObject, writeObject };
