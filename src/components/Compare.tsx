import React, {useEffect, useState} from 'react'
import { useHistory, useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import StockService from '../services/stock';
import StepSeries from './StepSeries'
const { earnings } = StockService;
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

      <StepSeries />
    </div>
  )
}