const docClient = require("./dynamodb").docClient;

const TableName = "MarshalConversations";

const insert = Item => {
  return docClient.put({ TableName, Item }).promise();
};

const fetch = (sender, Limit = 1) =>
  docClient
    .query({
      TableName,
      ScanIndexForward: false,
      Limit,
      KeyConditionExpression: "#sd = :yyyy",
      ExpressionAttributeNames: { "#sd": "sender" },
      ExpressionAttributeValues: { ":yyyy": sender }
    })
    .promise();

const remove = sender =>
  fetch(sender, null).then(({ Items }) =>
    Promise.all(
      Items.map(item =>
        docClient
          .delete({ TableName, Key: { sender, timestamp: item.timestamp } })
          .promise()
      )
    )
  );

module.exports = { insert, fetch, remove };
