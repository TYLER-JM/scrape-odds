const jsdom = require('jsdom');
const axios = require('axios');

const { JSDOM } = jsdom;

(async () => {
  let response = await axios.get('https://www.oddsshark.com/nba/odds');
  let dom = await new JSDOM(response.data);
  let oddsRows = dom.window.document.getElementsByClassName('op-item-row-wrapper not-futures');

  for (row of oddsRows[0].childNodes) {
    console.log('FIRST CHILD', row.firstChild.lastChild.textContent);
    console.log('SECOND CHILD', row.lastChild.lastChild.textContent);
  }
})()