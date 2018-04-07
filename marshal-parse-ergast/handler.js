const parse = require("./parse");

module.exports.parse = (event, context, callback) => {
  const keys = event.Records.map(i => i.dynamodb.Keys.endpoint.S);
  Promise.all(keys.map(parse)).then(response => {
    console.log(JSON.stringify({ keys, response }, null, 4));
    callback(null, { message: "marshal-parse-ergast", keys });
  });
};
