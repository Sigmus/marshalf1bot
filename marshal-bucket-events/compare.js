const sha1 = require("sha1");

module.exports = (current, previous) => {
  return new Promise((resolve, reject) => {
    resolve({ current: sha1(current), previous: sha1(previous) });
  });
};
