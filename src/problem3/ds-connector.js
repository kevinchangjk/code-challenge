const https = require('https');

// abstract out required properties and methods into class Price
class Price {
  constructor(buy, sell, id, pair, timestamp) {
    this.buy = buy;
    this.sell = sell;
    this.id = id;
    this.pair = pair;
    this.timestamp = timestamp;
  }
  toDecimals(amt) {
    return amt/100;
  }
  mid() {
    return this.toDecimals((this.buy + this.sell) / 2);
  }
  quote() {
    return this.pair.substring(3);
  }
}

class Datasource {

  // function to request data from server
  async fetchPrices(url) {
    return new Promise((resolve, reject) => {
      const req = https.get(url, (res) => {
        let data = '';
        res.on('data', (d) => {
          data += d;
        });
        res.on('end', () => {
          data = resolve(JSON.parse(data));
        });
      });
    });
  }

  async getPrices() {
    const response = await this.fetchPrices("https://static.ngnrs.io/test/prices");
    const data = response.data.prices;
    // creating array of prices from retrieved data
    const prices = data.map((price) => {
      const res = new Price(
        price.buy,
        price.sell,
        price.id,
        price.pair,
        price.timestamp
      );
      return res;
    });
    return prices;
  }
}

// testing
const ds = new Datasource();
ds.getPrices()
  .then((prices) => {
    prices.forEach((price) => {
      console.log(
        `Mid price for ${price.pair} is ${price.mid()} ${price.quote()}.`
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });
