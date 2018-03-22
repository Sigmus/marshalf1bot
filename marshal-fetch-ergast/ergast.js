const request = require("request");

/*
 * Return a promise of an JSON API request
 */
const ergast = (path, qs = {}) => {
  return new Promise((resolve, reject) => {
    request(
      {
        uri: `http://ergast.com/api/f1/${path}.json`,
        qs,
        method: "GET"
      },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          reject(response.body);
          return;
        }
        resolve(JSON.parse(response.body));
      }
    );
  });
};

module.exports = ergast;
