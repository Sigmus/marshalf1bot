const remaining = require("./remaining");
const drivers = require("./drivers");
const constructors = require("./constructors");
const results = require("./results");
const qualifying = require("./qualifying");
const winners = require("./winners");
const round = require("./round");

module.exports = (cmd, data) => {
  console.log("cmd", cmd);
  let aux;

  if (cmd === "drivers") {
    return drivers(data.standings.drivers);
  }

  if (cmd === "constructors") {
    return constructors(data.standings.constructors);
  }

  if (cmd === "races") {
    return remaining(data.rounds);
  }

  if (cmd === "last results") {
    return results(data.rounds[0]);
  }

  aux = cmd.split("results");
  if (aux.length === 2) {
    return results(data.rounds[parseInt(aux[1])]);
  }

  aux = cmd.split("qualifying");
  if (aux.length === 2) {
    return qualifying(data.rounds[parseInt(aux[1])]);
  }

  if (cmd === "winners") {
    return winners(data.rounds[0]);
  }

  if (cmd === "next") {
    return round(data.rounds[0], 0);
  }

  return "What?";
};
