import React from 'react';
import { scaleBand, scaleLinear, min, max, extent, format } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 100, left: 200 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 60;

const csvUrl =
	'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv';

	export const ScatterPlot = () => {
		const data = useData(csvUrl);

		if (!data) {
			return <pre>Loading...</pre>;
		}

		const innerHeight = height - margin.top - margin.bottom;
		const innerWidth = width - margin.left - margin.right;

		const xValue = d => d.sepal_length;
		const xAxisLabel = 'Petal Length';

		const yValue = d => d.sepal_width;
		const yAxisLabel = 'Sepal Width';

		const siFormat = format('.2s');
		function xAxisTickFormat(tickValue) {
			return siFormat(tickValue).replace('G', 'B')
		}

		const xScale = scaleLinear()
		// .domain([min(data, xValue), max(data, xValue)])
		.domain(extent(data, xValue))
		.range([0, innerWidth])
		.nice();
	
	const yScale = scaleLinear()
		.domain(extent(data, yValue))
		.range([0, innerHeight]);

		return (
			<svg width={width} height={height}>
				<g transform={`translate(${margin.left},${margin.top})`}>
					<AxisBottom
						xScale={xScale}
						innerHeight={innerHeight}
						tickFormat={xAxisTickFormat}
						tickOffset={5}
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