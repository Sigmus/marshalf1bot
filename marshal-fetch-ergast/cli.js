const fetchRemote = require("./fetch-remote");

fetchRemote().then(data => console.log(JSON.stringify(data, null, 4)));
