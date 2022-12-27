import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import {BarChart as Chart, GridlineSeries, Gridline} from 'reaviz'

export default function BarChart(props: { cumulativeTotalData: any; cumulativeDeathData: any; }) {
  const { cumulativeTotalData, cumulativeDeathData } = props

  // Sort both arrays
  const sortedCumulativeTotalData = cumulativeTotalData.sort((a: any, b: any) => (b.data - a.data))
  const sortedCumulativeDeathData = cumulativeDeathData.sort((a: any, b: any) => (b.data - a.data))

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
  
  // Logic to get the top X on the chart only
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
        <Grid item xs={3} sx={{
          textAlign: 'right',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <InputLabel id="countries-quantity-select-label">Countries Quantity</InputLabel>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'left' }}>
        <FormControl size='small'>
            <Select
              value={quantitySelector}
              label=""
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
