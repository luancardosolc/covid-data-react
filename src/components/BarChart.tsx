import {BarChart as Chart, GridlineSeries, Gridline} from 'reaviz'

export default function BarChart(props: { continents: any; countries: any; locations: any; cumulativeTotalData: any; cumulativeDeathData: any; }) {
  const { continents, countries, locations, cumulativeTotalData, cumulativeDeathData } = props
  const data = [
    {
      key: 'Phishing Attack',
      data: 10
    },
    {
      key: 'IDS',
      data: 14
    },
    {
      key: 'Malware',
      data: 5
    },
    {
      key: 'DLP',
      data: 18
    }
  ]
  // for (const locationAbbreviation in locations) {
  //   const locationData = locations[locationAbbreviation]
    
  // }
  
  console.log('LUAN cumulativeTotalData', cumulativeTotalData);
  console.log('LUAN cumulativeDeathData', cumulativeDeathData);
  // MISSING STEPS:

  // Sort both arrays
  // Logic for the data type switcher
  // Logic to get the top 10 on the chart only
  // Logic for the Quantity Selector
  // Logic to make the Quantity Selector change the data

  return (
    <>
      <Chart
        width={350}
        height={250}
        data={data}
        gridlines={<GridlineSeries line={<Gridline direction="all" />} />}
      />
      {/* Data type selector */}
      {/* Quantity Selector */}
    </>
  );
}
