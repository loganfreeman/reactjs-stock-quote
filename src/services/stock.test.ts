import stockService from './stock'

const {searchSymbol, overview, globalQuote, earnings } = stockService
test('search symbol', (done) => {
  searchSymbol("BA").then(response => {
    const { data } = response;
    expect(data).not.toBeFalsy();
    expect(data.bestMatches).not.toBeFalsy();
    expect(data.bestMatches[0]["1. symbol"]).not.toBeFalsy();
    for(const stock of data.bestMatches) {
      console.log(stock["1. symbol"]);
      expect(/BA/.test(stock["1. symbol"])).toBeTruthy();
    }
    done();
  })
})


test('search name', (done) => {
  searchSymbol("tencent").then(response => {
    const { data } = response;
    expect(data).not.toBeFalsy();
    expect(data.bestMatches).not.toBeFalsy();
    expect(data.bestMatches[0]["1. symbol"]).toEqual("TCEHY");
    for(const stock of data.bestMatches) {
      console.log(stock["2. name"]);
    }
    done();
  })
})


test('overview', (done) => {
  overview("IBM").then(response => {
    const { data } = response;
    expect(data).not.toBeFalsy();
    expect(data.Symbol).toEqual("IBM");
    expect(data.AssetType).toEqual("Common Stock");
    console.log(data.Name)
    done();
  })
})

test('global quote', (done) => {
  globalQuote("IBM").then(response => {
    const { data } = response;
    expect(data).not.toBeFalsy();
    expect(data["Global Quote"]).not.toBeFalsy();
    console.log(data["Global Quote"]["01. symbol"]);
    done();
  })
})


test('earnings', (done) => {
  earnings("IBM").then(response => {
    const { data } = response;
    expect(data).not.toBeFalsy();
    expect(data.annualEarnings).toBeDefined();
    expect(data.quarterlyEarnings).toBeDefined();
    expect(data.symbol).toEqual("IBM");
    done();
  })
})