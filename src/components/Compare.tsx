import React, {useEffect, useState} from 'react'
import { useHistory, useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import StockService from '../services/stock';
import StepSeries from './StepSeries'
const { earnings } = StockService;

const data = [
  {
    month: "Jan",
    series2: 51,
    series1: 125
  },
  {
    month: "Feb",
    series2: 91,
    series1: 132
  },
  {
    month: "Mar",
    series2: 34,
    series1: 141
  },
  {
    month: "Apr",
    series2: 47,
    series1: 158
  },
  {
    month: "May",
    series2: 63,
    series1: 133
  },
  {
    month: "June",
    series2: 58,
    series1: 143
  },
  {
    month: "July",
    series2: 56,
    series1: 176
  },
  {
    month: "Aug",
    series2: 77,
    series1: 194
  },
  {
    month: "Sep",
    series2: 99,
    series1: 115
  },
  {
    month: "Oct",
    series2: 106,
    series1: 134
  },
  {
    month: "Nov",
    series2: 88,
    series1: 110
  },
  {
    month: "Dec",
    series2: 56,
    series1: 91
  }
];

export default function() {
  const history = useHistory();
  const { symbols } = useParams<{symbols:string}>();
  const [reportedEPS, setReportedEPS] = useState<any[]>();
  useEffect(() => {
    (async function() {
      const stocks = symbols.split(",");
      if(stocks.length>0) {
        let earningsArray: any[] = [];
        for(const stock of stocks) {
          const {data} = await earnings(stock);
          earningsArray.push(data);
        }
        setReportedEPS(earningsArray);
      }
    })();
  }, [symbols]);
  return (
    <div>
      <p><Button variant="contained" onClick={e => history.push("/")}>Home</Button></p>

      <ButtonGroup color="secondary" aria-label="outlined secondary button group">
        {symbols.split(",").map(stock => (
          <Button key={stock}>
            {stock}
          </Button>
        ))}
      </ButtonGroup>

      <StepSeries data={data}/>
    </div>
  )
}