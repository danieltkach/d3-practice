import './App.css'
import { BarChart } from './components/BarChart'
import { LineChart } from './components/LineChart'
import { ScatterPlot } from './components/ScatterPlot'
import { Map } from './components/Map/index';

const CHARTS = [
	<Map />,
	<LineChart />,
	<BarChart />,
	<ScatterPlot />,
];

export const App = () => {
	return (
		<div className="App">
			<ChartsMapper charts={CHARTS} />
		</div>
	)
}

const ChartsMapper = ({ charts }) => charts?.map(chart => <div className="chartCard">{chart}</div>)