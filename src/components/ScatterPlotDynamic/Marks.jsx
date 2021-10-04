export const Marks =({data,	xScale, yScale, xValue, yValue, tooltipFormat, circleRadius})=> 
	data.map(d => (
    <circle className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
			r={circleRadius}
			key={xValue(d)+yValue(d)*Math.random()}
    >
      <title>{`Petal: ${tooltipFormat(xValue(d))} - Sepal: ${tooltipFormat(yValue(d))}`}</title>
    </circle>
  ));