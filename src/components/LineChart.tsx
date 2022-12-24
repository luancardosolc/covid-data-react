import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import {ChartDataShape, ChartZoomPan, LineChart as Chart, LineSeries, PointSeries} from 'reaviz'

export default function LineChart(props: { continents: any; countries: any; worldData: any; }) {
  const { continents, countries, worldData } = props
  console.log('worldData', worldData);
  // Switch between death count or confirmed cases
  // Switch between daily new values or cumulative mode
  
  // cumulative: total_cases
  // daily new values: 
  
  const confirmedCasesWorldwide: ChartDataShape[] | { id: any; key: Date; data: any; }[] | undefined = []
  worldData.data.forEach((item: any, index: any) => {
    confirmedCasesWorldwide.push({
      id: index,
      key: new Date(item.date),
      data: item.total_cases,
    });
  });
  
  const [dataType, setDataType] = useState('confirmed_cases');
  const [countType, setCountType] = useState('cumulative');

  const handleDataTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newDataType: string,
  ) => {
    setDataType(newDataType);
  };
  
  const handleCountTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newCountType: string,
  ) => {
    setCountType(newCountType);
  };

  return (
    <Box style={{ marginTop: '16px' }}>
      <Chart
        height={400}
        data={confirmedCasesWorldwide}
        series={<LineSeries symbols={<PointSeries show={true} />} />}
        zoomPan={<ChartZoomPan />}
      />
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={6} sx={{ textAlign: 'center' }}>
          <ToggleButtonGroup
            color="primary"
            value={dataType}
            exclusive
            onChange={handleDataTypeChange}
            aria-label="Platform"
            size="small"
          >
            <ToggleButton value="confirmed_cases">Confirmed Cases</ToggleButton>
            <ToggleButton value="death_count">Death Count</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'center' }}>
          <ToggleButtonGroup
            color="primary"
            value={countType}
            exclusive
            onChange={handleCountTypeChange}
            aria-label="Platform"
            size="small"
          >
            <ToggleButton value="cumulative">Cumulative</ToggleButton>
            <ToggleButton value="daily_new_values">Daily New Values</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </Box>
  );
}
