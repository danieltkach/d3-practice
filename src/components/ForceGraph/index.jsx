import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {nodes} from './data';

const width = 960;
const height = 460;
const centerX = width / 2;
const centerY = height / 2;

function randomMovement() {
	const randomPolarity =()=> Math.random()*2 > 1 ? 1 : -1;
	return Math.random()*randomPolarity()*10;
}

function vibrationForce() {
	for (let i=0, n=nodes.length, node, k=randomMovement(); i < n; ++i) {
    node = nodes[i];
    node.vx += node.x * k;
    node.vy += node.y * k;
  }
}

export const ForceGraph = () => {
	const svgRef = useRef();
	
	useEffect(() => {
		const svg = d3.select(svgRef.current);

		const simulation = d3.forceSimulation(nodes)
			// .force('links', d3.forceLink(links))
			.force('charge', d3.forceManyBody().strength(-30))
			.force('center', d3.forceCenter(centerX, centerY))
			.force('vibration', vibrationForce());

		const circles = svg.selectAll().data(nodes).join("g")
			.attr("transform", d=> `translate(${d.x}, ${d.y})`)
		circles
			.append("circle")
			.attr("fill", "#5B60DF")
			.attr("r", 30);
		circles
			.append("circle")
			.attr("fill", "none")
			.attr("stroke", "#5B60DF")
			.attr("stroke-width", 4)
			.attr("r", 40);

		simulation.on('tick', () => {
			circles.attr("transform", d=> `translate(${d.x+randomMovement()}, ${d.y+randomMovement()})`);
		});
	}, [nodes]);

	const svgStyles = { width: `${width}px`, height: `${height}px` };

	return (
		<div className="ForceSimulation">
			<svg style={svgStyles} ref={svgRef} />
		</div>
	)
}