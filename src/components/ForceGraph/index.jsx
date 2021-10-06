import React, {useRef, useEffect, useState} from 'react';
import * as d3 from 'd3';

const nodes = [
	{ id: 'Daniel' },
	{ id: 'Prahlad' },
	{ id: 'Uma' },
];

const links = [
	{ source: 0, target: 1 },
	{ source: 1, target: 2 },
]

export const ForceGraph = () => {
	const svgRef = useRef();
	const svg = d3.select(svgRef.current);

	useEffect(() => {
		const simulation = d3.forceSimulation(nodes)
			.force('link', d3.forceLink(links))
			.force('charge', d3.forceManyBody())
			.force('center', d3.forceCenter());

		simulation.on('tick', () => {

		});

	}, []);

	const svgStyles = {width: "500px", height: "500px"}

	return (
		<div>
			<svg style={svgStyles} ref={svgRef} />
		</div>
	)
}