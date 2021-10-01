import { line, curveNatural } from 'd3';

export const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius }) => {
	return (
		<>
			<path
				fill="none"
				stroke="black"
				d={
					line()
						.x(d => xScale(xValue(d)))
						.y(d => yScale(yValue(d)))
						.curve(curveNatural)(data)
				}
			/>
			{/* {
				data.map(d => (
					<circle className="mark"
						cx={xScale(xValue(d))}
						cy={yScale(yValue(d))}
						r={circleRadius}
						key={xValue(d) + yValue(d) * Math.random()}
					>
						<title>{tooltipFormat(xValue(d))}</title>
					</circle>
				))
			} */}
		</>
	)
}