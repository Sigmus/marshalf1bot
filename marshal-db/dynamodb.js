var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-1"
  // endpoint: "http://localhost:8000"
});

const client = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = { client, docClient };
