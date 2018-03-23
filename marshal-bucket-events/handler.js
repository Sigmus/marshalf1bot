const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const compare = require("./compare");
const fetchCurrentAndPrevious = require("./fetch-current-and-previous");

module.exports.hello = (event, context, callback) => {
  fetchCurrentAndPrevious().then(response => {
    compare(response.current, response.previous).then(response =>
      console.log(response)
    );
  });
};
