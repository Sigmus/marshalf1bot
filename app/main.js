const bodyParser = require('body-parser');
const express = require('express');
const config = require('./config');
const threadSettings = require('./thread-settings');
const {createThreadSetting, verifyRequestSignature} = require('./fb');
const {all} = require('./data');
const processMessage = require('./process');

threadSettings.forEach(createThreadSetting);

const app = express();

app.set('port', config.port);

app.use(bodyParser.json({verify: verifyRequestSignature}));


app.post('/webhook', function (req, res) {
  // Make sure this is a page subscription
  if (req.body.object !== 'page') {
    return;
  }
  req.body.entry.forEach(function(pageEntry) {
    // We may receive one or more messages
    pageEntry.messaging.forEach(processMessage);
  });
  // Inform Facebook the callback was sucessfully received
  res.sendStatus(200);
});


// Only used once to subscribe the page to the bots
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === config.validationToken) {
    res.status(200).send(req.query['hub.challenge']);
  }
  else {
    res.sendStatus(403);
  }
});


// This is for debug, bot doesn't use it
app.get('/data', function(req, res) {
  res.status(200).send(all());
});


app.listen(app.get('port'), function() {
  console.log('Marshal Bot is running on port', app.get('port'));
});


module.exports = app;
