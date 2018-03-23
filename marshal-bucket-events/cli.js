const compare = require("./compare");
const current = require("./data/current");
const previous = require("./data/previous");

compare()
  .then(response => console.log(response))
  .catch(err => console.log(err));
