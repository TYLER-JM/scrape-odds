const jsdom = require('jsdom');
const axios = require('axios');

const { JSDOM } = jsdom;

const convertOdds = (americanOdds) => {
  if (!!Number(americanOdds)) {
    if (Number(americanOdds) > 0) {
      let converted = (Number(americanOdds) / 100) + 1;
      return converted.toFixed(2);
    } else {
      let converted = (100 / Math.abs(Number(americanOdds))) + 1;
      return converted.toFixed(2);
    }
  }
};

(async () => {
  let response = await axios.get('https://www.oddsshark.com/nba/odds');
  let dom = await new JSDOM(response.data);
  let oddsRows = dom.window.document.getElementsByClassName('op-item-row-wrapper not-futures');

  let results = [];
  for (row of oddsRows[0].childNodes) {
    let visitorOdds = row.firstChild.lastChild.textContent;

      console.log('Visitor after Conversion: ', convertOdds(visitorOdds));
    // console.log('SECOND CHILD', row.lastChild.lastChild.textContent);
  }
})()