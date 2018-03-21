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
  let roundNumber;

  if (cmd === "drivers") {
    return drivers(data.standings.drivers);
  }

  if (cmd === "constructors") {
    return constructors(data.standings.constructors);
  }

  if (cmd === "races" || cmd === "remaining") {
    return remaining(data.rounds);
  }

  if (cmd === "last results") {
    return results(data.rounds[0]);
  }

  aux = cmd.split("results");
  if (aux.length === 2 && aux[1] !== "") {
    return results(data.rounds[parseInt(aux[1])]);
  }

  aux = cmd.split("qualifying");
  if (aux.length === 2 && aux[1] !== "") {
    return qualifying(data.rounds[parseInt(aux[1])]);
  }

  aux = cmd.split("round");
  if (aux.length === 2 && aux[1] !== "") {
    roundNumber = parseInt(aux[1]);
    return qualifying(data.rounds[roundNumber], roundNumber);
  }

  if (cmd === "winners") {
    return winners(data.rounds[0]);
  }

  if (cmd === "next") {
    return round(data.rounds[0], 0);
  }

  return "What?";
};
