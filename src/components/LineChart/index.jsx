import React from 'react';
import { scaleLinear, scaleTime, format, extent, min, max, timeFormat } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 60;
const yAxisLabelOffset = 45;

const csvUrl =
	'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';

export const LineChart = () => {
  const data = useData(csvUrl);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = d => d.timestamp;
  const xAxisLabel = 'Time';

  const yValue = d => d.temperature;
  const yAxisLabel = 'Temperature';

  const xAxisTickFormat = timeFormat('%a');

  const xScale = scaleTime()
    // .domain(extent(data, xValue))
		.domain([min(data, xValue)-0.5, max(data, xValue)])
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
		.nice();

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={9}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${innerHeight /
            2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={7}
        />
      </g>
    </svg>
  );
};