import React from 'react';
import './App.css';
import {Helmet} from "react-helmet";

import Search from './components/Search';
function App() {
  return (

      <div className="App">
        <Search />
        <Helmet>
            <meta charSet="utf-8" />
            <title>Stock Quote</title>
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
  );
}

export default App;
