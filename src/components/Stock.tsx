import React, {useEffect, useState} from 'react'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TrendingDown from '@material-ui/icons/TrendingDown';
import TrendingUp from '@material-ui/icons/TrendingUp';
import StockService from '../services/stock';
const { daily } = StockService;
export default function({stock}: {stock:{symbol: string, name: string}}) {
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
    </Card>
  )
}