import {get} from './request'
const url = 'https://www.alphavantage.co/query'
test('get', (done) => {
  const data = {
    'function': "SYMBOL_SEARCH",
  'keywords': "BA",
  'apikey': "demo"
  }
  get(url, data).then(response => {
    const { data } = response;
    expect(data).not.toBeFalsy();
    expect(data.bestMatches).not.toBeFalsy();
    expect(data.bestMatches[0]["1. symbol"]).not.toBeFalsy();
    done();
  })

})