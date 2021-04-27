import React from 'react';
import './App.css';
import {Helmet} from "react-helmet";
import { useState, useEffect } from 'react';
import Search from './components/Search';
import { takeRight } from 'lodash';
import { normalize } from './utils/normalize';
import Stock from "./components/Stock";
import ErrorBoundary from './ErrorBoundary';
import Grid from '@material-ui/core/Grid';

function App() {
  const [stocks, setStocks] = useState<any[]>([]);

  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    if(stocks && stocks.length > 0) localStorage.setItem("STOCKS", JSON.stringify(stocks))
  }, [stocks]);

  useEffect(() => {
    const stored = localStorage.getItem("STOCKS");
    if(stored) setFavorites(JSON.parse(stored));
  }, []);


  return (

      <ErrorBoundary className="App">

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h1>Enter stock symbol to search</h1>
            <Search onChange={stocks => setStocks(takeRight(stocks, 3).reverse().map(s => normalize(s)))}/>
            {
              stocks.map(stock => <Stock stock={stock} key={stock.symbol} />)
            }
        </Grid>
          <Grid item xs={6}>
            <h1>My Favorites</h1>
            {
              favorites.map(stock => <Stock stock={stock} key={stock.symbol} />)
            }

          </Grid>
        </Grid>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Stock Quote</title>
        </Helmet>
      </ErrorBoundary>
  );
}

export default App;
