import React from 'react'
import { useHistory, useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';

export default function() {
  const history = useHistory();
  const { symbol } = useParams<any>();

  return (
    <div>
      <p><Button variant="contained" onClick={e => history.push("/")}>Home</Button></p>
      <h1>{symbol}</h1>
    </div>
  )
}