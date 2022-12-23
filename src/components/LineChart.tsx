import {LineChart as Chart, LineSeries, PointSeries} from 'reaviz'

export default function LineChart() {
  const data = [
    { id: '0', key: new Date('2020-02-17T08:00:00.000Z'), data: 10 },
    { id: '1', key: new Date('2020-02-21T08:00:00.000Z'), data: 18 },
    { id: '2', key: new Date('2020-02-26T08:00:00.000Z'), data: 2 },
    { id: '3', key: new Date('2020-02-29T08:00:00.000Z'), data: 10 }
  ]

  return (
    <Chart
      width={350}
      height={250}
      data={data}
      series={<LineSeries symbols={<PointSeries show={true} />} />}
    />
  );
}
