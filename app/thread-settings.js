module.exports = [
  {
    'setting_type': 'call_to_actions',
    'thread_state': 'existing_thread',
    'call_to_actions': [
      {type: 'postback', title: 'Last results', payload: 'results'},
      {type: 'postback', title: 'Drivers', payload: 'drivers'},
      {type: 'postback', title: 'Constructors', payload: 'constructors'},
      {type: 'postback', title: 'Next Races', payload: 'next'}
    ]
  },
  {
    setting_type: 'greeting',
    greeting: {text: 'Formula 1 Calendar and Standings'}
  },
  {
    setting_type: 'call_to_actions',
    thread_state: 'new_thread',
    call_to_actions: [{'payload': 'help'}]
  }
];
