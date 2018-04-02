const { client, docClient } = require("./dynamodb");

const TableName = "Ergast";

const insert = Item => {
  return docClient.put({ TableName, Item }).promise();
};

const fetch = (endpoint, Limit = 1) =>
  docClient
    .query({
      TableName,
      ScanIndexForward: false,
      Limit,
      KeyConditionExpression: "#sd = :yyyy",
      ExpressionAttributeNames: { "#sd": "endpoint" },
      ExpressionAttributeValues: { ":yyyy": endpoint }
    })
    .promise();

const fetchItem = endpoint =>
  fetch(endpoint).then(response => JSON.parse(response.Items[0].data));

const remove = endpoint =>
  fetch(endpoint, null).then(({ Items }) =>
    Promise.all(
      Items.map(item =>
        docClient
          .delete({ TableName, Key: { endpoint, timestamp: item.timestamp } })
          .promise()
      )
    )
  );

const createTable = () => {
  const params = {
    TableName,
    KeySchema: [
      { AttributeName: "endpoint", KeyType: "HASH" }, //Partition key
      { AttributeName: "timestamp", KeyType: "RANGE" } //Sort key
    ],
    AttributeDefinitions: [
      { AttributeName: "endpoint", AttributeType: "S" },
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

module.exports = { insert, fetch, fetchItem, remove, createTable };
