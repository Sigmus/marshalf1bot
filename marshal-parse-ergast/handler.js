module.exports.parse = (event, context, callback) => {
  console.log(event);
  callback(null, {
    message: "marshal-parse-ergast",
    event
  });
};
