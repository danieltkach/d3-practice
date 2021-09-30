export const AxisLeft = ({ yScale, innerWidth, tickOffset=3 }) =>
  yScale.ticks().map(tickValue => (
    <g className="tick" transform={`translate(0,${yScale(tickValue)})`} key={tickValue}>
      <line x2={innerWidth} />
      <text
        style={{ textAnchor: 'end' }}
        x={-tickOffset}
        dy=".32em"
      >
        {tickValue}
      </text>
    </g>
  ));