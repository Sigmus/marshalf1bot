const ApiBuilder = require("claudia-api-builder");
const api = new ApiBuilder();

const fetchRemote = require("./fetch-remote");
const s3Cache = require("./s3-cache");

module.exports = api;

api.get("/data", () => {
  return s3Cache.readObject(
    { Bucket: "marshalf1bot", Key: "data.json" },
    fetchRemote,
    5
  );
});
