const { fbTemplate } = require("claudia-bot-builder");

module.exports = () => {
  return new Promise(resolve => {
    // Intro text dsplaying current settings
    const obj = new fbTemplate.Text(
      "To change your timezone, send your current location."
    );

    obj.addQuickReplyLocation();

    resolve(obj.get());
  });
};
