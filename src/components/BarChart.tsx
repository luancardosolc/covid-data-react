import {BarChart as Chart, GridlineSeries, Gridline} from 'reaviz'

export default function BarChart() {
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

  return (
    <Chart
      width={350}
      height={250}
      data={data}
      gridlines={<GridlineSeries line={<Gridline direction="all" />} />}
    />
  );
}
