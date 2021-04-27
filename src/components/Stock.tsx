import React, {useEffect, useState} from 'react'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TrendingDown from '@material-ui/icons/TrendingDown';
import TrendingUp from '@material-ui/icons/TrendingUp';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

import StockService from '../services/stock';
const { daily } = StockService;
export default function({stock}: {stock:{symbol: string, name: string}}) {
  const history = useHistory();
  const [last, setLast] = useState<any>({});
  useEffect(() => {
    (async function getDaily() {
      const {data: {
        "Meta Data": meta,
        "Time Series (Daily)": timeSeriesDaily
      }} = await daily(stock.symbol);
      if(meta) setLast(timeSeriesDaily[meta["3. Last Refreshed"]])
    })()
  }, [stock])
  return (
    <Card>
      <CardHeader title={stock.symbol} subheader={stock.name} />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            Open
          </Grid>
          <Grid item xs={6}>
            {last["1. open"]}
          </Grid>
          <Grid item xs={6}>
            High
          </Grid>
          <Grid item xs={6}>
            {last["2. high"]}
          </Grid>
          <Grid item xs={6}>
            Low
          </Grid>
          <Grid item xs={6}>
            {last["3. low"]}
          </Grid>
          <Grid item xs={6}>
            Close
          </Grid>
          <Grid item xs={6}>
            {last["4. close"]}
          </Grid>
          <Grid item xs={6}>
            Volume
          </Grid>
          <Grid item xs={6}>
            {last["5. volume"]}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary" onClick={e => history.push(`/detail/${stock.symbol}`)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}