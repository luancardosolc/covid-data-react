import { ReactNode, SyntheticEvent, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LineChart from './LineChart';
import BarChart from './BarChart';
import Translator from '../i18n/translator';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ChartTabs(props: { selectedLocation: any; cumulativeTotalData: any; cumulativeDeathData: any; }) {
  const { selectedLocation, cumulativeTotalData, cumulativeDeathData } = props
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={<Translator translationKey='reportedCases' />} {...a11yProps(0)} />
          <Tab label={<Translator translationKey='rankedCases' />} {...a11yProps(1)} />
        </Tabs>
      </Box>
      {selectedLocation && (
        <TabPanel value={value} index={0}>
          <LineChart
            selectedLocation={selectedLocation}
          />
        </TabPanel>
      )}
      <TabPanel value={value} index={1}>
        <BarChart
          cumulativeTotalData={cumulativeTotalData}
          cumulativeDeathData={cumulativeDeathData}
        />
      </TabPanel>
    </Box>
  );
}
