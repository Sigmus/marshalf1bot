const moment = require("moment");

const races = require("./replies/races");
const drivers = require("./replies/drivers");
const constructors = require("./replies/constructors");
const results = require("./replies/results");
const qualifying = require("./replies/qualifying");
const winners = require("./replies/winners");
const round = require("./replies/round");

const currentSeason = require("./data/current-season");
const conversations = require("./data/conversations");

const getNextRounds = () => {
  const now = moment().unix();
  return currentSeason.filter((item, index) => {
    return item.ts > now;
  });
};

const getPrevRounds = () => {
  const now = moment().unix();
  return currentSeason
    .filter((item, index) => {
      return item.ts < now;
    })
    .reverse();
};

module.exports = request => {
  console.log(JSON.stringify(request, null, 4));

  const cmd = request.text.toLowerCase();
  let aux;
  let roundNumber;

  return conversations.fetch(request.sender).then(data => {
    data.conversations.unshift(request);

    return conversations.insert(request.sender, data).then(() => {
      console.log(data.conversations);

      if (cmd === "drivers") {
        return drivers();
      }

      if (cmd === "constructors") {
        return constructors();
      }

      if (cmd === "races") {
        return races(0);
      }

      if (cmd === "remaining") {
        return races(parseInt(getNextRounds()[0].round, 10) - 1);
      }

      if (cmd === "next") {
        return round(parseInt(getNextRounds()[0].round, 10) - 1);
      }

      if (cmd == "last results") {
        return results(parseInt(getPrevRounds()[0].round, 10) - 1);
      }

      aux = cmd.split("results");
      if (aux.length === 2 && aux[1] !== "") {
        return results(parseInt(aux[1]) - 1);
      }

      aux = cmd.split("qualifying");
      if (aux.length === 2 && aux[1] !== "") {
        return qualifying(parseInt(aux[1]) - 1);
      }

      aux = cmd.split("round");
      if (aux.length === 2 && aux[1] !== "") {
        return round(parseInt(aux[1]) - 1);
      }

      aux = cmd.split("winners");
      if (aux.length === 2 && aux[1] !== "") {
        return winners(parseInt(aux[1]) - 1);
      }

      return "What?";
    });
  });
};
