const {help, round, list, nextRound, unsolicitedHelp} = require('./replies');
const {getLastRoundNumber} = require('./data');


function process(event) {
  if (event.message && event.message.text && ! event.message.is_echo) {
    if (event.message.quick_reply && event.message.quick_reply.payload) {
      processQuickReply(event);
    }
    else {
      processText(event);
    }
  }
  else if (event.postback) {
    processPostBackMessage(event);
  }
}


function processText(event) {
  const messageText = event.message.text.toLowerCase();
  if (messageText === 'help') {
    help(event.sender.id);
    return;
  }
  let aux = messageText.split('round');
  if (aux.length === 2) {
    let roundNumber = parseInt(aux[1]);
    round(event.sender.id, roundNumber);
    return;
  }
  unsolicitedHelp(event.sender.id);
}


function processQuickReply(event) {
  const payload = JSON.parse(event.message.quick_reply.payload);
  if (payload.type === 'list') {
    const props = {
      name: payload.name,
      offset: payload.offset,
      recipientId: event.sender.id
    };
    if (payload.roundNumber) {
      props.roundNumber = payload.roundNumber;
    }
    list(props);
    return;
  }
}


function processPostBackMessage(event) {
  const recipientId = event.sender.id;
  const {payload} = event.postback;

  if (payload === 'help') {
    help(recipientId);
  }

  if (payload === 'results') {
    const roundNumber = getLastRoundNumber();
    list({name: 'results', recipientId, roundNumber})
  }

  if (payload === 'remaining') {
    list({name: 'remaining', recipientId})
  }

  if (payload === 'next') {
    nextRound(recipientId);
  }

  if (payload === 'drivers') {
    list({name: 'drivers', recipientId})
  }

  if (payload === 'constructors') {
    list({name: 'constructrors', recipientId})
  }

  let aux = payload.split('results');
  if (aux.length === 2) {
    const roundNumber = parseInt(aux[1]);
    list({name: 'results', recipientId, roundNumber})
    return;
  }

  aux = payload.split('winners');
  if (aux.length === 2) {
    const roundNumber = parseInt(aux[1]);
    list({name: 'winners', recipientId, roundNumber})
    return;
  }

  aux = payload.split('qualifying');
  if (aux.length === 2) {
    const roundNumber = parseInt(aux[1]);
    list({name: 'qualifying', recipientId, roundNumber})
    return;
  }
}


module.exports = process;
