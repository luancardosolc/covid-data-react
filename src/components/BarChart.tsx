import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import {BarChart as Chart, GridlineSeries, Gridline} from 'reaviz'

export default function BarChart(props: { continents: any; countries: any; locations: any; cumulativeTotalData: any; cumulativeDeathData: any; }) {
  const { continents, countries, locations, cumulativeTotalData, cumulativeDeathData } = props
  
  console.log('LUAN cumulativeTotalData', cumulativeTotalData);
  console.log('LUAN cumulativeDeathData', cumulativeDeathData);

  // MISSING STEPS:

  // Sort both arrays
  const sortedCumulativeTotalData = cumulativeTotalData.sort((a: any, b: any) => (b.data - a.data))
  console.log('LUAN sortedCumulativeTotalData', sortedCumulativeTotalData);
  const sortedCumulativeDeathData = cumulativeDeathData.sort((a: any, b: any) => (b.data - a.data))
  console.log('LUAN sortedCumulativeDeathData', sortedCumulativeDeathData);

  // Logic for the data type switcher
  const [dataType, setDataType] = useState('total_cases');
  const handleDataTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newDataType: string,
  ) => {
    setDataType(newDataType);
  };

  // Logic for the Quantity Selector
  const [quantitySelector, setQuantitySelector] = useState('10');
  const handleQuantityChange = (event: SelectChangeEvent) => {
    setQuantitySelector(event.target.value as string);
  };

  // Logic to make the Quantity Selector change the data
  
  // Logic to get the top 10 on the chart only
  let data = []
  if (dataType === 'total_cases') {
    data = sortedCumulativeTotalData.slice(0, quantitySelector)
  } else {
    data = sortedCumulativeDeathData.slice(0, quantitySelector)
  }

  return (
    <>
      <Chart
        height={400}
        data={data}
        gridlines={<GridlineSeries line={<Gridline direction="all" />} />}
      />
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {/* Data type selector */}
        <Grid item xs={6} sx={{ textAlign: 'center' }}>
          <ToggleButtonGroup
            color="primary"
            value={dataType}
            exclusive
            onChange={handleDataTypeChange}
            aria-label="Platform"
            size="small"
          >
            <ToggleButton value="total_cases">Total Cases</ToggleButton>
            <ToggleButton value="total_deaths">Total Deaths</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        {/* Quantity Selector */}
        <Grid item xs={6} sx={{ textAlign: 'center', minWidth: 120 }}>
          <FormControl size='small'>
            <InputLabel id="countries-quantity-select-label">Countries Quantity</InputLabel>
            <Select
              labelId="countries-quantity-select-label"
              id="countries-quantity-select"
              value={quantitySelector}
              label="Countries Quantity"
              onChange={handleQuantityChange}
            >
              {[...Array(sortedCumulativeTotalData.length)].map((x, i) => 
                <MenuItem value={(i+1).toString()}>{i+1}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
