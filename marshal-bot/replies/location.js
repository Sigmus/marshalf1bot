const axios = require("axios");
const { fbTemplate } = require("claudia-bot-builder");

module.exports = (message, previousMessage) => {
  const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${
    message.originalRequest.message.attachments[0].payload.coordinates.lat
  },${
    message.originalRequest.message.attachments[0].payload.coordinates.long
  }&timestamp=${Math.round(
    parseInt(new Date().getTime()) / 1000
  ).toString()}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  return axios.get(url).then(response => {
    const obj = new fbTemplate.Text(
      `The detected timezone is: ${response.data.timeZoneName} (${
        response.data.timeZoneId
      }). Is that correct?`
    );

    obj.addQuickReply(
      "Yes, set timezone",
      `set timezone ${response.data.timeZoneId}`
    );

    obj.addQuickReplyLocation();

    return obj.get();
  });
};
