import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import { LineChart as Chart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LineChart(props: { selectedLocation: any; }) {
  const { selectedLocation } = props
  const confirmedCumulativeCases: any[] | { id: any; key: Date; data: any; }[] | undefined = [];
  const confirmedDailyCases: any[] | { id: any; key: Date; data: any; }[] | undefined = [];
  const deathCumulativeCases: any[] | { id: any; key: Date; data: any; }[] | undefined = [];
  const deathDailyCases: any[] | { id: any; key: Date; data: any; }[] | undefined = [];
  let selectedData: any[] | { id: any; key: Date; data: any; }[] | undefined = [];

  const [dataType, setDataType] = useState('confirmed_cases');
  const [countType, setCountType] = useState('cumulative');

  selectedLocation.data.forEach((item: any, index: any) => {
    confirmedCumulativeCases.push({
      id: index,
      key: item.date,
      data: item.total_cases,
    });
    
    confirmedDailyCases.push({
      id: index,
      key: item.date,
      data: item.new_cases,
    });
    
    deathCumulativeCases.push({
      id: index,
      key: item.date,
      data: item.total_deaths,
    });
    
    deathDailyCases.push({
      id: index,
      key: item.date,
      data: item.new_deaths,
    });
  });
  
  if (dataType === 'confirmed_cases' && countType === 'cumulative') {
    selectedData = confirmedCumulativeCases;
  }
  
  if (dataType === 'confirmed_cases' && countType === 'daily_new_values') {
    selectedData = confirmedDailyCases;
  }
  
  if (dataType === 'death_count' && countType === 'cumulative') {
    selectedData = deathCumulativeCases;
  }
  
  if (dataType === 'death_count' && countType === 'daily_new_values') {
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
  
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  console.log('LineChart', { selectedData });
  return (
    <Box style={{ marginTop: '16px' }}>
      <ResponsiveContainer height={400}>
        <Chart
          width={1056}
          height={300}
          data={selectedData}
          margin={{
            top: 5,
            right: 0,
            left: 50,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="key" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="data" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </Chart>
      </ResponsiveContainer>
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
