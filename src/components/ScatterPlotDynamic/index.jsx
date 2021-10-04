import React, { useState } from 'react';
import { scaleLinear, format, extent, min, max } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { DropDown } from './DropDown';
import styles from './styles.module.scss';

const width = 960;
const menuHeight = 75;
const height = 500 - menuHeight;
const margin = { top: 20, right: 30, bottom: 85, left: 90 };
const xAxisLabelOffset = 60;
const yAxisLabelOffset = 45;

const attributes = [
	{ value: 'sepal_length', label: 'Sepal Length' },
	{ value: 'sepal_width', label: 'Sepal Width' },
	{ value: 'petal_length', label: 'Petal Length' },
	{ value: 'petal_width', label: 'Petal Width' },
	{ value: 'species', label: 'species' }
];

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

const siFormat = format('.2s');
const xAxisTickFormat = tickValue => siFormat(tickValue).replace('m', '');

const getLabel = value => {
	for (let i = 0; i < attributes.length; i++) {
		if (attributes[i].value === value) {
			return attributes[i].label;
		}
	}
};

export const ScatterPlotDynamic = () => {
	// State ---
	const [xAttribute, setXAttribute] = useState('petal_length');
	const [yAttribute, setYAttribute] = useState('sepal_width');

	// Data
	const data = useData();
	if (!data) {
		return <pre>Loading...</pre>;
	}

	// Constants ---
	const xValue = d => d[xAttribute];
	const xAxisLabel = getLabel(xAttribute);
	const xScale = scaleLinear()
		.domain([min(data, xValue) - 0.5, max(data, xValue)])
		.range([0, innerWidth])
		.nice();

	const yValue = d => d[yAttribute];
	const yAxisLabel = getLabel(yAttribute);
	const yScale = scaleLinear()
		.domain(extent(data, yValue))
		.range([0, innerHeight]);

	// Render ---
	return (
		<div className={styles.ScatterPlotDynamic}>
			<div className={styles.menusPanel}>
				<label>X-axis:
					<DropDown
						options={attributes}
						id={'x-select'}
						selectedValue={xAttribute}
						onSelectedValueChange={setXAttribute}
					/>
				</label>
				<label>Y-axis:
					<DropDown
						options={attributes}
						id={'y-select'}
						selectedValue={yAttribute}
						onSelectedValueChange={setYAttribute}
					/>
				</label>
			</div>
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
		</div>
	);
};