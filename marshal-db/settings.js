const { client, docClient } = require("./dynamodb");

const TableName = "MarshalSettings";

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

const createTable = () => {
  const params = {
    TableName,
    KeySchema: [
      { AttributeName: "sender", KeyType: "HASH" }, //Partition key
      { AttributeName: "timestamp", KeyType: "RANGE" } //Sort key
    ],
    AttributeDefinitions: [
      { AttributeName: "sender", AttributeType: "S" },
      { AttributeName: "timestamp", AttributeType: "N" }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  };

  return client
    .createTable(params)
    .promise()
    .then(data => {
      console.log(
        "Created table. Table description JSON:",
        JSON.stringify(data, null, 2)
      );
    })
    .catch(err =>
      console.error(
        "Unable to create table. Error JSON:",
        JSON.stringify(err, null, 2)
      )
    );
};

module.exports = { insert, fetch, remove, createTable };
