const parse = require("./parse");
const message = require("./message");

module.exports.parse = (event, context, callback) => {
  const keys = event.Records.map(i => i.dynamodb.Keys.endpoint.S);
  Promise.all(keys.map(key => parse(key, 2))).then(response => {
    Promise.all(
      response
        .filter(i => i.areDifferent === true)
        .map(i => message(`New results for ${i.key}`))
    ).then(() => callback(null, { message: "marshal-parse-ergast", keys }));
  });
};
