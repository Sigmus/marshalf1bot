const season = require("marshal-seasons/season");

const races = require("./replies/races");
const drivers = require("./replies/drivers");
const constructors = require("./replies/constructors");
const results = require("./replies/results");
const qualifying = require("./replies/qualifying");
const winners = require("./replies/winners");
const round = require("./replies/round");
const location = require("./replies/location");
const setKeySettings = require("./replies/set-key-settings");
const { isLocationAttachment } = require("./tools");

module.exports = (message, previousMessage) => {
  if (isLocationAttachment(message)) {
    return location(message, previousMessage);
  }

  let cmd = message.text;
  let aux;
  let roundNumber;

  console.log("cmd", cmd);

  aux = cmd.split("set");
  if (aux.length === 2) {
    aux = aux[1].split(" ");
    return setKeySettings(aux[1], aux[2]);
  }

  cmd = cmd.toLowerCase();

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
    return races(season.getNextRoundIndex());
  }

  if (cmd === "next") {
    return round(season.getNextRoundIndex());
  }

  if (cmd == "last results") {
    return results(season.getPrevRoundIndex());
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
};
