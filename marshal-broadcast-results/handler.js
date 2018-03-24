const axios = require("axios");

module.exports.broadcast = (event, context, callback) => {
  const data = {
    messaging_type: "UPDATE",
    recipient: {
      id: process.env.SENDER_ID
    },
    message: {
      text: event.Records[0].Sns.Message
    }
  };

  axios({
    data,
    method: "POST",
    url: `https://graph.facebook.com/v2.6/me/messages?access_token=${
      process.env.ACCESS_TOKEN
    }`
  })
    .then(() => callback(null, "finished"))
    .catch(err => console.log(err));
};
