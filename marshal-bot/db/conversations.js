const docClient = require("./dynamodb").docClient;

const TableName = "MarshalConversations";

const insert = message => {
  const Item = Object.assign({}, message, {
    recipient: message.originalRequest.recipient.id,
    timestamp: message.originalRequest.timestamp
  });
  return docClient.put({ TableName, Item }).promise();
};

const fetch = sender =>
  docClient
    .query({
      TableName,
      KeyConditionExpression: "#sd = :yyyy",
      ExpressionAttributeNames: { "#sd": "sender" },
      ExpressionAttributeValues: { ":yyyy": sender }
    })
    .promise();

const remove = sender =>
  fetch(sender).then(({ Items }) =>
    Promise.all(
      Items.map(item =>
        docClient
          .delete({ TableName, Key: { sender, timestamp: item.timestamp } })
          .promise()
      )
    )
  );

module.exports = { insert, fetch, remove };
