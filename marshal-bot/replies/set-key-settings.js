const settings = require("../settings");

module.exports = (key, value) => {
  settings.setKey(key, value);
  return settings
    .save()
    .then(() => `Updated key "${key}"" to value "${value}"`);
};
