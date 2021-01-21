const jsdom = require('jsdom');
const axios = require('axios');

const { JSDOM } = jsdom;

const convertOdds = (americanOdds) => {
  if (!!Number(americanOdds)) {
    if (Number(americanOdds) > 0) {
      let converted = (Number(americanOdds) / 100) + 1;
      return Number(converted.toFixed(2));
    } else {
      let converted = (100 / Math.abs(Number(americanOdds))) + 1;
      return Number(converted.toFixed(2));
    }
  }
};

module.exports = async function() {
  let response = await axios.get('https://www.oddsshark.com/nba/odds');
  let dom = await new JSDOM(response.data);
  let oddsRows = dom.window.document.getElementsByClassName('op-item-row-wrapper not-futures');

  let results = [[],[]];
  for (row of oddsRows[0].childNodes) {
    let visitorOdds = row.firstChild.lastChild.textContent;
    let homeOdds = row.lastChild.lastChild.textContent;
    results[0].push(convertOdds(homeOdds));
    results[1].push(convertOdds(visitorOdds));
    // results.push({
    //   visAmericanOdd: visitorOdds, homeAmericanOdds: homeOdds,
    //   visDecimalOdds: convertOdds(visitorOdds), homeDecimalOdds: convertOdds(homeOdds)
    // });
  }

  console.log('array of odds: ', results);
  return results;
}

// scrape();