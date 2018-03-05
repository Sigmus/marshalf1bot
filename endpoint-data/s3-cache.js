const moment = require("moment");
const AWS = require("aws-sdk");

const s3 = new AWS.S3();

const readObject = (params, fetcher, timeout) =>
  new Promise((resolve, reject) => {
    s3.getObject(params, (err, _data) => {
      if (err) {
        console.log(err);
        return;
      }
      const diff = moment().diff(moment(_data.LastModified), "minutes");
      const data = JSON.parse(_data.Body.toString("utf-8"));
      if (diff > timeout) {
        fetcher().then(data => {
          writeObject(params, data).then(() => resolve(data));
        });
      } else {
        resolve(data);
      }
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
