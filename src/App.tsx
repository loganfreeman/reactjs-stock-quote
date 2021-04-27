import React from 'react';
import './App.css';
import {Helmet} from "react-helmet";
import { useState } from 'react';
import Search from './components/Search';
function App() {
  const [stocks, setStocks] = useState<any[]>([]);

  return (

      <div className="App">
        <Search onChange={setStocks}/>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Stock Quote</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
  );
}

export default App;
