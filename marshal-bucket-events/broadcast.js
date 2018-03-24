const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });
var sns = new AWS.SNS();

module.exports = Message =>
  sns
    .publish({
      Message,
      TopicArn: "arn:aws:sns:eu-west-1:637601246378:marshal-results"
    })
    .promise();
