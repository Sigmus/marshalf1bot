const db = require("marshal-db/settings");

let settings = {};

const setKey = (key, value) => (settings[key] = value);

const getKey = key => settings[key];

const save = () => {
  settings.timestamp = new Date().getTime();
  return db.insert(settings);
};

const fetch = sender => {
  return db.fetch(sender).then(response => {
    if (!response.Items.length) {
      // Ensure default keys not only when creating a whole new payload
      settings = {
        sender,
        timezone: "Europe/London",
        pagesize: 5
      };
      return save().then(() => settings);
    }
    settings = response.Items[0];
    return settings;
  });
};

module.exports = { setKey, getKey, save, fetch };
