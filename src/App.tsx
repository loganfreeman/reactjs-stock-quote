import React from 'react';
import './App.css';
import {Helmet} from "react-helmet";
import { useState } from 'react';
import Search from './components/Search';
import { takeRight } from 'lodash';
import { normalize } from './utils/normalize';
import Stock from "./components/Stock"
function App() {
  const [stocks, setStocks] = useState<any[]>([]);

  return (

      <div className="App">
        <Search onChange={setStocks}/>
        {
          takeRight(stocks, 3).reverse().map(s => normalize(s)).map(stock => <Stock stock={stock} key={stock.symbol} />)
        }
        <Helmet>
            <meta charSet="utf-8" />
            <title>Stock Quote</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
  );
}

export default App;
