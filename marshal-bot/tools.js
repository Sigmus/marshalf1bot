const isLocationAttachment = message =>
  message.originalRequest &&
  message.originalRequest.message &&
  message.originalRequest.message.attachments &&
  message.originalRequest.message.attachments[0].type === "location";

module.exports = { isLocationAttachment };
