const botBuilder = require("claudia-bot-builder");
const AWS = require("aws-sdk");
const router = require("./router");

const s3 = new AWS.S3();

module.exports = botBuilder(
  request => {
    return s3
      .getObject({ Bucket: "marshalf1bot", Key: "data.json" })
      .promise()
      .then(response => {
        const data = JSON.parse(response.Body.toString());
        const cmd = request.text.toLowerCase();
        return router(cmd, data);
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  },
  { platforms: ["facebook"] }
);
