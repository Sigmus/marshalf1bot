const fetchRemote = require("./fetch-remote");
const s3Cache = require("./s3-cache");

module.exports.refresh = (event, context, callback) => {
  s3Cache
    .readObject({ Bucket: "marshalf1bot", Key: "data.json" }, fetchRemote)
    .then(() => {
      callback(null, {
        message: "data-refreshed",
        event
      });
    });
};
