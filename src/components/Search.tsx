// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isEmptyOrSpaces } from '../utils/stringUtils';
import StockService from '../services/stock';
const { searchSymbol } = StockService;

export default function SearchStock({onChange}: {
  onChange: (v: any[]) => void
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<any[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const loading = open && options.length == 0;
  React.useEffect(() => {
    let active = true;

    if (isEmptyOrSpaces(searchValue) || !open) {
      return undefined;
    }

    (async () => {
      const {
        data: {
          bestMatches,
        },
      } = await searchSymbol(searchValue);

      if (active) {
        setOptions(bestMatches);
      }

    })();

    return () => {
      active = false;
    };
  }, [searchValue]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      multiple
      id="stock-search-input"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(e, v) => onChange(v)}
      getOptionSelected={(option, value) => option["1. symbol"] === value["1. symbol"]}
      getOptionLabel={(option) => option["1. symbol"]}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          onChange={e => setSearchValue(e.target.value)}
          value={searchValue}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}