const db = require("marshal-db/conversations");
const settings = require("./settings");
const { isLocationAttachment } = require("./tools");

module.exports = message => {
  return settings.fetch(message.sender).then(xpto => {
    let previousMessage = null;

    return db.fetch(message.sender).then(response => {
      if (response.Items.length) {
        previousMessage = response.Items[0];
      }
      if (isLocationAttachment(message)) {
        return previousMessage;
      }
      return db
        .insert({
          sender: message.sender,
          text: message.text,
          timestamp: message.originalRequest.timestamp,
          originalRequest: message.originalRequest
        })
        .then(() => previousMessage);
    });
  });
};
