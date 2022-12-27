import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import {ChartDataShape, ChartZoomPan, LineChart as Chart, LineSeries, PointSeries} from 'reaviz'

export default function LineChart(props: { selectedLocation: any; }) {
  const { selectedLocation } = props
  const confirmedCumulativeCases: ChartDataShape[] | { id: any; key: Date; data: any; }[] | undefined = [];
  const confirmedDailyCases: ChartDataShape[] | { id: any; key: Date; data: any; }[] | undefined = [];
  const deathCumulativeCases: ChartDataShape[] | { id: any; key: Date; data: any; }[] | undefined = [];
  const deathDailyCases: ChartDataShape[] | { id: any; key: Date; data: any; }[] | undefined = [];
  let selectedData: ChartDataShape[] | { id: any; key: Date; data: any; }[] | undefined = [];

  const [dataType, setDataType] = useState('confirmed_cases');
  const [countType, setCountType] = useState('cumulative');
  
  const confirmedCasesWorldwide: ChartDataShape[] | { id: any; key: Date; data: any; }[] | undefined = []
  selectedLocation.data.forEach((item: any, index: any) => {
    confirmedCumulativeCases.push({
      id: index,
      key: new Date(item.date),
      data: item.total_cases,
    });
    
    confirmedDailyCases.push({
      id: index,
      key: new Date(item.date),
      data: item.new_cases,
    });
    
    deathCumulativeCases.push({
      id: index,
      key: new Date(item.date),
      data: item.total_deaths,
    });
    
    deathDailyCases.push({
      id: index,
      key: new Date(item.date),
      data: item.new_deaths,
    });
  });
  
  if (dataType === 'confirmed_cases' && countType === 'cumulative') {
    console.log('LUAN 1');
    selectedData = confirmedCumulativeCases;
  }
  
  if (dataType === 'confirmed_cases' && countType === 'daily_new_values') {
    console.log('LUAN 2');
    selectedData = confirmedDailyCases;
  }
  
  if (dataType === 'death_count' && countType === 'cumulative') {
    console.log('LUAN 3');
    selectedData = deathCumulativeCases;
  }
  
  if (dataType === 'death_count' && countType === 'daily_new_values') {
    console.log('LUAN 4');
    selectedData = deathDailyCases;
  }

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
        data={selectedData}
        series={<LineSeries symbols={null} />}
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
