const _ = require("lodash");

const results = {
  2013: require("./2013/results"),
  2014: require("./2014/results"),
  2015: require("./2015/results"),
  2016: require("./2016/results"),
  2017: require("./2017/results")
};

const winners = _.reduce(
  results,
  (acc, next, season) => {
    next.forEach(race => {
      acc[race.slug] = acc[race.slug] || [];
      acc[race.slug].push({
        season,
        race: race.slug,
        driver: race.results[0].Driver.familyName
      });
    });
    return acc;
  },
  {}
);

console.log(JSON.stringify(winners, null, 4));
