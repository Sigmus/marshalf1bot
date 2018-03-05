const moment = require("moment");
const _ = require("lodash");
const AWS = require("aws-sdk");

const fetchRemote = require("./fetch-remote");

module.exports = () => {
  const s3 = new AWS.S3();

  return fetchRemote().then(data => {
    const params = { Bucket: "marshalf1bot", Key: "data.json" };

    const writeFile = Body =>
      new Promise((resolve, reject) => {
        params.Body = Body;
        s3.putObject(params, err => {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully uploaded data to myBucket/myKey");
            resolve(data);
          }
        });
      });

    const readFile = () =>
      new Promise((resolve, reject) => {
        s3.getObject(params, (err, _data) => {
          if (err) {
            console.log(err);
          } else {
            const diff = moment().diff(moment(_data.LastModified), "minutes");
            console.log("diff", diff);
            if (diff > 2) {
              writeFile(JSON.stringify(data, null, 4)).then(() =>
                resolve(data)
              );
            } else {
              resolve(data);
            }
          }
        });
      });

    return readFile();
  });
};
