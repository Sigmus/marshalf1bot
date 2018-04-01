const moment = require("moment");
const year = "2018";
const data = require(`./archive/${year}/season`);

const getNextRounds = () => {
  const now = moment().unix();
  return data.filter((item, index) => item.ts > now);
};

const getNextRoundIndex = () => parseInt(getNextRounds()[0].round, 10) - 1;

const getPrevRounds = () => {
  const now = moment().unix();
  return data.filter((item, index) => item.ts < now).reverse();
};

const getPrevRoundIndex = () => parseInt(getPrevRounds()[0].round, 10) - 1;

module.exports = { data, year, getNextRoundIndex, getPrevRoundIndex };
