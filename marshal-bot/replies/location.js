const axios = require("axios");

module.exports = (message, previousMessage) => {
  const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${
    message.originalRequest.message.attachments[0].payload.coordinates.lat
  },${
    message.originalRequest.message.attachments[0].payload.coordinates.long
  }&timestamp=${Math.round(
    parseInt(new Date().getTime()) / 1000
  ).toString()}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  return axios.get(url).then(response => {
    return `Timezone is "${response.data.timeZoneId}"`;
  });
};
