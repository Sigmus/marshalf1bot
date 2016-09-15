const moment = require('moment');
const {getRound, getDrivers, getConstructors, getNextRounds} = require('./data');
const {callSendAPI} = require('./fb');


const lists = {

  results(props) {
    const {roundNumber} = props;
    if ( ! roundNumber) {
      return;
    }
    const round = getRound(roundNumber);
    const title = `${round.raceName} results:`;
    const rows = round.results[2016].map(
      result => `${result.position}. ${result.Driver.familyName}`
    );
    return {title, rows};
  },

  winners(props) {
    const {roundNumber} = props;
    if ( ! roundNumber) {
      return;
    }
    const round = getRound(roundNumber);
    const title = `Latest ${round.raceName} winners:`;
    const rows = Object.keys(round.results).reverse().map(
      season => `${season}. ${round.results[season][0].Driver.familyName}`
    );
    return {title, rows};
  },

  qualifying(props) {
    const {roundNumber} = props;
    if ( ! roundNumber) {
      return;
    }
    const round = getRound(roundNumber);
    const title = `${round.raceName} Qualifying:`;
    const rows = round.qualifying.map((item) => {
      return `${item.position}. ${item.Driver.familyName} – ${item.Q3 || item.Q2 || item.Q1}`;
    });
    return {title, rows};
  },

  drivers() {
    const title = `2016 Driver's Championship:`;
    const rows = getDrivers().map(
      driver => `${driver.position}. ${driver.Driver.familyName} – ${driver.points}`
    );
    return {title, rows};
  },

  constructrors() {
    const title = `2016 Constructor's Championship:`;
    const rows = getConstructors().map(
      row => `${row.position}. ${row.Constructor.name} – ${row.points}`
    );
    return {title, rows};
  },

  remaining() {
    const title = `Remaining 2016 rounds:`;
    const rows = getNextRounds().map(
      row => `${row.round}. ${row.title}, ${moment.unix(row.ts).format('MMM Do')}`
    )
    return {title, rows};
  }
};


module.exports = function(props) {
  const {name, recipientId, offset = 0, page = 5} = props;
  const list = lists[name](props);
  if ( ! list) {
    console.log('list not found!', props)
    return;
  }
  const rows = list.rows.slice(offset, offset + page);
  const message = {
    text: ((offset === 0 ) ? `${list.title}\n\n` : '') + rows.join('\n')
  };
  const nextRows = list.rows.slice(offset + page, offset + page * 2);

  if (nextRows.length) {
    const payload = {
      type: 'list',
      name,
      offset: (offset + page)
    };
    if (props.roundNumber) {
      payload.roundNumber = props.roundNumber;
    }
    message.quick_replies = [{
      content_type: 'text',
      title: `See +${nextRows.length}`,
      payload: JSON.stringify(payload)
    }];
  }

  callSendAPI({recipient: {id: recipientId}, message});
}

