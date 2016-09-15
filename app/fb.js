const request = require('request');
const crypto = require('crypto');
const config = require('./config');


function sendTextMessage(recipientId, messageText) {
  callSendAPI({
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  });
}


function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: config.pageAccessToken},
    method: 'POST',
    json: messageData
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;
    } else {
      console.error('Unable to send message.');
      console.error(response);
      console.error(error);
    }
  });
}


/*
 * Verify that the callback came from Facebook. Using the App Secret from
 * the App Dashboard, we can verify the signature that is sent with each
 * callback in the x-hub-signature field, located in the header.
 *
 * https://developers.facebook.com/docs/graph-api/webhooks#setup
 *
 */
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];

  if (!signature) {
    // For testing, let's log an error. In production, you should throw an
    // error.
    console.error("Couldn't validate the signature.");
  } else {
    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', config.appSecret)
                        .update(buf)
                        .digest('hex');

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}


function createThreadSetting(json) {
  request({
    uri:  `https://graph.facebook.com/v2.6/${config.pageId}/thread_settings`,
    qs: {access_token: config.pageAccessToken},
    method: 'POST',
    json
  }, function (error, response, body) {
    if (error || response.statusCode != 200) {
      console.error('Unable to create Thread Setting');
      console.error(response);
      console.error(error);
    }
  });
}


module.exports = {
  sendTextMessage,
  callSendAPI,
  verifyRequestSignature,
  createThreadSetting
};
