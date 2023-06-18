import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import { LineChart as Chart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns'

import { dateHelper } from '../utils/dateHelper';
import Translator from '../i18n/translator';

const CustomizedAxisTick = (props: any) => {
  const { x, y, stroke, payload } = props;
  const [monthDay, year] = payload.value.split(', ');

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} fill="#666">
        <tspan textAnchor="middle" x="0">{monthDay}</tspan>
        <tspan textAnchor="middle" x="0" dy="20">{year}</tspan>
      </text>
    </g>
  );
};

export default function LineChart(props: { selectedLocation: any; }) {
  const { selectedLocation } = props
  const confirmedCumulativeCases: any[] | { id: any; key: string; data: any; }[] | undefined = [];
  const confirmedDailyCases: any[] | { id: any; key: string; data: any; }[] | undefined = [];
  const deathCumulativeCases: any[] | { id: any; key: string; data: any; }[] | undefined = [];
  const deathDailyCases: any[] | { id: any; key: string; data: any; }[] | undefined = [];
  let selectedData: any[] | { id: any; key: string; data: any; }[] | undefined = [];
  let dataLabel: string = 'Cases';

  const [dataType, setDataType] = useState('confirmed_cases');
  const [countType, setCountType] = useState('cumulative');

  selectedLocation.data.forEach((item: any, index: any) => {
    confirmedCumulativeCases.push({
      id: index,
      key: dateHelper.format(item.date),
      data: item.total_cases,
    });

    confirmedDailyCases.push({
      id: index,
      key: dateHelper.format(item.date),
      data: item.new_cases,
    });

    deathCumulativeCases.push({
      id: index,
      key: dateHelper.format(item.date),
      data: item.total_deaths,
    });

    deathDailyCases.push({
      id: index,
      key: dateHelper.format(item.date),
      data: item.new_deaths,
    });
  });

  if (dataType === 'confirmed_cases' && countType === 'cumulative') {
    selectedData = confirmedCumulativeCases;
    dataLabel = 'Cases';
  }

  if (dataType === 'confirmed_cases' && countType === 'daily_new_values') {
    selectedData = confirmedDailyCases;
    dataLabel = 'Cases';
  }

  if (dataType === 'death_count' && countType === 'cumulative') {
    selectedData = deathCumulativeCases;
    dataLabel = 'Deaths';
  }

  if (dataType === 'death_count' && countType === 'daily_new_values') {
    selectedData = deathDailyCases;
    dataLabel = 'Deaths';
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
      <ResponsiveContainer height={400}>
        <Chart
          width={1056}
          height={300}
          data={selectedData}
          margin={{
            top: 5,
            right: 50,
            left: 50,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="key"
            // minTickGap={40}
            tickSize={10}
            tick={<CustomizedAxisTick />}
          />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="data"
            stroke="#82ca9d"
            activeDot={{ r: 5 }}
            dot={false}
            strokeWidth={3}
            name={dataLabel}
          />
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
            <ToggleButton value="confirmed_cases"><Translator translationKey="confirmedCases" /></ToggleButton>
            <ToggleButton value="death_count"><Translator translationKey="deathCount" /></ToggleButton>
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
            <ToggleButton value="cumulative"><Translator translationKey="cumulative" /></ToggleButton>
            <ToggleButton value="daily_new_values"><Translator translationKey="dailyNewValues" /></ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </Box>
  );
}
