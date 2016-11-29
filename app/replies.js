const _ = require('lodash');
const moment = require('moment');
const {callSendAPI, sendTextMessage} = require('./fb');
const {getNextRounds, getRound} = require('./data');
const list = require('./list');

function nextRound(recipientId) {
  sendTextMessage(recipientId, "2016 Season is over");
  return;
  // const nextRoundNumber = getNextRounds()[0].round;
  // round(recipientId, nextRoundNumber);
}


function round(recipientId, roundNumber) {
  const round = getRound(roundNumber);
  const buttons = [];
  if ( ! round) {
    return;
  }
  if (_.size(round.results) > 0) {
    if (round.results[2016]) {
      buttons.push({
        type: 'postback',
        title: 'Race Results',
        payload: `results ${roundNumber}`
      });
    }
  }
  if (_.size(round.qualifying) > 0) {
    buttons.push({
      type: 'postback',
      title: 'Qualifying',
      payload: `qualifying ${roundNumber}`
    });
  }
  buttons.push({
    type: 'postback',
    title: 'Remaining races',
    payload: 'remaining'
  });
  callSendAPI({
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: `${round.raceName}\n${moment.unix(round.ts).format('MMM Do, LT')} – Round ${round.round}`,
          buttons: buttons
        }
      }
    }
  });
}


function unsolicitedHelp(recipientId) {
  sendTextMessage(recipientId, "I don't understand\nI'm sending you help!");
  help(recipientId);
}


function help(recipientId) {
  callSendAPI({
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'What do you want to see?',
          buttons: [
            {type: 'postback', title: 'Next Race', payload: 'next'},
            {type: 'postback', title: 'Drivers', payload: 'drivers'},
            {type: 'postback', title: 'Constructors', payload: 'constructors'}
          ]
        }
      }
    }
  });
}


module.exports = {
  nextRound,
  round,
  help,
  unsolicitedHelp,
  list
};
