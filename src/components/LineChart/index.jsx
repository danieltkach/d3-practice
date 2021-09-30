import React from 'react';
import { scaleBand, scaleLinear, max, format } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const csvUrl =
'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';


const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 100, left: 200 };

export const LineChart = () => {
	const data = useData(csvUrl);

	if (!data) {
		return <pre>Loading...</pre>;
	}

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const xValue = d => d.;
	const yValue = d => d.;

	const yScale = scaleBand()
		.domain(data.map(yValue))
		.range([0, innerHeight])
		.padding(0.1);

	const xScale = scaleLinear()
		.domain([0, max(data, xValue)])
		.range([0, innerWidth]);

	const labelOffset = 60;

	function xAxisTickFormat(n) {
		return format(".2s")(n).replace('', '')
	}

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				<AxisBottom xScale={xScale} innerHeight={innerHeight}
					tickFormat={xAxisTickFormat} />
				<AxisLeft yScale={yScale} />
				<Marks
					data={data}
					xScale={xScale}
					yScale={yScale}
					xValue={xValue}
					yValue={yValue}
					tooltipFormat={xAxisTickFormat}
				/>
				<text className="axis-label"
					x={innerWidth / 2} y={innerHeight + labelOffset} textAnchor="middle"
				>
					Temperature
				</text>
			</g>
		</svg>
	);
};