const db = require("marshal-db/settings");

let settings = {};

const setKey = (key, value) => (settings[key] = value);

const save = () => {
  settings.timestamp = new Date().getTime();
  return db.insert(settings);
};

const fetch = sender => {
  return db.fetch(sender).then(response => {
    settings = response.Items.length ? response.Items[0] : { sender };
    return settings;
  });
};

module.exports = { setKey, save, fetch };
