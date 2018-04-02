const db = require("marshal-db/conversations");

module.exports = message => {
  let previousMessage = null;
  return db.fetch(message.sender).then(response => {
    if (response.Items.length) {
      previousMessage = response.Items[0];
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
};
