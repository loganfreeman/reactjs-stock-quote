import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import Search from './components/Search';
import { takeRight } from 'lodash';
import { normalize } from './utils/normalize';
import Stock from "./components/Stock";
import ErrorBoundary from './ErrorBoundary';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chart from './components/Chart';
import Compare from './components/Compare'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

function App() {
  const history = useHistory();
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
    <Switch>
      <Route path="/detail/:symbol">
        <Chart />
      </Route>
      <Route path="/compare/:symbols">
        <Compare />
      </Route>
      <Route path="/">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h1>Enter stock symbol to search</h1>
            <Grid container direction="row" justify="space-between">
              <Grid item><Search onChange={stocks => setStocks(takeRight(stocks, 3).reverse().map(s => normalize(s)))}/></Grid>
              <Grid item><Button variant="contained" onClick={e => history.push(`/compare/${favorites.map(s => s.symbol)}`)}>Compare</Button></Grid>
            </Grid>
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
      </Route>
    </Switch>

  );
}

export default App;
