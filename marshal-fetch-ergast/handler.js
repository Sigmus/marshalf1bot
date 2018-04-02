const refresh = require("./refresh");
const season = require("marshal-seasons/season");

module.exports.refresh = (event, context, callback) => {
  refresh(season.year)
    .then(() => callback(null, { message: "data-refreshed" }))
    .catch(err => console.log(err));
};
