import './App.css'
import { BarChart } from './components/BarChart'
import { LineChart } from './components/LineChart'
import { Map } from './components/Map/index';
import { ScatterPlotDynamic } from './components/ScatterPlotDynamic';
import { ForceGraph } from './components/ForceGraph/index';

const CHARTS = [
	<ForceGraph />,
	<Map />,
	<ScatterPlotDynamic />,
	<LineChart />,
	<BarChart />,
];

export const App = () => {
	return (
		<div className="App">
			<ChartsMapper charts={CHARTS} />
		</div>
	)
}

const ChartsMapper = ({ charts }) => charts?.map(
	chart => <div key={chart.type.name} className="chartCard">{chart}</div>
)