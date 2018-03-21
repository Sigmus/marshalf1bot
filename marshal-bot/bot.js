const AWS = require("aws-sdk");
const botBuilder = require("claudia-bot-builder");

const s3 = new AWS.S3();

const router = require("./router");

module.exports = botBuilder(
  request => {
    return new Promise((resolve, reject) => {
      s3.getObject(
        {
          Bucket: "marshalf1bot",
          Key: "data.json"
        },
        (err, response) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            const data = JSON.parse(response.Body.toString());
            const cmd = request.text.toLowerCase();
            resolve(router(cmd, data));
          }
        }
      );
    });
  },
  { platforms: ["facebook"] }
);
