export function normalize(stock: any): {symbol: string, name: string} {
  return {
    symbol: stock["1. symbol"],
    name: stock["2. name"]
  }
}