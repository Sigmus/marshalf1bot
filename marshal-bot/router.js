const remaining = require("./replies/remaining");
const drivers = require("./replies/drivers");
const constructors = require("./replies/constructors");
const results = require("./replies/results");
const qualifying = require("./replies/qualifying");
const winners = require("./replies/winners");
const round = require("./replies/round");

module.exports = cmd => {
  let aux;
  let roundNumber;

  if (cmd === "drivers") {
    return drivers();
  }

  if (cmd === "constructors") {
    return constructors();
  }

  if (cmd === "races" || cmd === "remaining") {
    return remaining();
  }

  if (cmd === "last results") {
    return results(0);
  }

  aux = cmd.split("results");
  if (aux.length === 2 && aux[1] !== "") {
    return results(parseInt(aux[1]));
  }

  aux = cmd.split("qualifying");
  if (aux.length === 2 && aux[1] !== "") {
    return qualifying(parseInt(aux[1]));
  }

  aux = cmd.split("round");
  if (aux.length === 2 && aux[1] !== "") {
    return round(parseInt(aux[1]));
  }

  aux = cmd.split("winners");
  if (aux.length === 2 && aux[1] !== "") {
    return winners(data.rounds[parseInt(aux[1])]);
  }
  if (cmd === "next") {
    return round(0);
  }

  return "What?";
};
