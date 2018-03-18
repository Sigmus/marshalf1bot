const fetchRemote = require("./fetch-remote");
const AWS = require("aws-sdk");

const s3 = new AWS.S3();

module.exports.refresh = (event, context, callback) => {
  fetchRemote().then(data =>

  );
};
