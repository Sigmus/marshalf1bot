const argv = require("minimist")(process.argv.slice(2));
const { client, docClient } = require("./dynamodb");
const conversations = require("./conversations");

const TableName = "MarshalConversations";

if (argv.create) {
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

  client
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
}

if (argv.insert) {
  const timestamp = new Date().getTime();
  conversations
    .insert({
      timestamp,
      sender: "xpto",
      text: "938982332",
      originalRequest: { timestamp }
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
}

if (argv.fetch) {
  conversations
    .fetch("xpto")
    // .then(r =>
    //   JSON.stringify(console.log(r.Items.map(x => x.originalRequest)), null, 4)
    // )
    .then(r => console.log(r))
    .catch(err => console.log(err));
}

if (argv.remove) {
  conversations
    .remove("1556914271059232")
    .then(r => console.log(r))
    .catch(err => console.log(err));
}
