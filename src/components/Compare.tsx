import React from 'react'
import { useHistory, useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export default function() {
  const history = useHistory();
  const { symbols } = useParams<{symbols:string}>();

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
    </div>
  )
}