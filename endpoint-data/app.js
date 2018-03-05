// https://a6fhgm3mmj.execute-api.eu-west-1.amazonaws.com/latest/hello

const ApiBuilder = require("claudia-api-builder");
const api = new ApiBuilder();

const data = require("./data");

module.exports = api;

api.get("/data", () => {
  return data();
});
