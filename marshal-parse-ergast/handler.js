module.exports.parse = (event, context, callback) => {
  console.log(JSON.stringify(event, null, 4));
  callback(null, {
    message: "marshal-parse-ergast",
    event
  });
};
