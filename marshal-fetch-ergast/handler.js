const refresh = require("./refresh");
const currentYear = require("./current-year");

module.exports.refresh = (event, context, callback) => {
  refresh(currentYear)
    .then(() => callback(null, { message: "data-refreshed" }))
    .catch(err => console.log(err));
};
