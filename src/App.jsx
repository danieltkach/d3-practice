import './App.css'
import { BarChart } from './components/BarChart'
import { ScatterPlot } from './components/ScatterPlot'

export const App =()=> {

  return (
    <div className="App">
      {/* <BarChart /> */}
			<ScatterPlot />
    </div>
  )
}