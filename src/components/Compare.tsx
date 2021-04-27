import React, {useEffect, useState} from 'react'
import { useHistory, useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import StockService from '../services/stock';
import StepSeries from './StepSeries';
import LineSeries from './LineSeries';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

const { earnings } = StockService;

export default function() {
  const history = useHistory();
  const { symbols } = useParams<{symbols:string}>();
  const [reportedEPS, setReportedEPS] = useState<any[]>([]);
  const [type, setType] = useState<any>('LineAdvance');
  useEffect(() => {
    (async function() {
      const stocks = symbols.split(",");
      if(stocks.length>0) {
        let earningsArray: any[] = [];
        for(const stock of stocks) {
          const {data: {
            annualEarnings,
            symbol
          }} = await earnings(stock);
          earningsArray = earningsArray.concat(annualEarnings.map((er: {fiscalDateEnding: any; reportedEPS: any;}) => (
            {
              key: symbol,
              month: er.fiscalDateEnding,
              value: Number(er.reportedEPS)
            }
          )));
        }
        setReportedEPS(earningsArray);
      }
    })();
  }, [symbols]);
  return (
    <div>
      <p><Button variant="contained" onClick={e => history.push("/")}>Home</Button></p>

      <Grid container justify="space-between" direction="row">
        <Grid item>
          <ButtonGroup color="secondary" aria-label="outlined secondary button group">
            {symbols.split(",").map(stock => (
              <Button key={stock}>
                {stock}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
        <Grid item>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <MenuItem value={'Geom'}>Geom</MenuItem>
            <MenuItem value={'LineAdvance'}>LineAdvance</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {
        type == 'Geom' && (<StepSeries data={reportedEPS}/>)
      }
      {
        type == 'LineAdvance' && (<LineSeries data={reportedEPS} />)
      }
    </div>
  )
}