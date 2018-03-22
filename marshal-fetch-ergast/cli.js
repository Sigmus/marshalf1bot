const fetchRemote = require("./fetch-remote-2017");

fetchRemote().then(data => console.log(JSON.stringify(data, null, 4)));
