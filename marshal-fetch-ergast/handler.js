const refresh = require("./refresh");

module.exports.refresh = (event, context, callback) => {
  refresh()
    .then(() => callback(null, { message: "data-refreshed" }))
    .catch(err => console.log(err));
};
