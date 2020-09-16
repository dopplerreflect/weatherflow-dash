import React, { useContext } from "react";
import Stat from "./components/Stat";
import Windchart from "./components/Windchart";
import Graph from "./components/Graph";
import RapWindsAloft from "./components/RapWindsAloft";
import SocketContext from "./components/SocketContext/context";
import Clock from "./components/clock.svg";
import "./App.css";

const App = () => {
  const { obs_st, rapid_wind, summary } = useContext(SocketContext);
  const latest_obs_st = obs_st[obs_st.length - 1];
  return (
    <div id="App">
      <div id="clock">
        <iframe frameBorder={0} src={Clock} width="100%" height="100%" />
      </div>
      <div id="temp">
        <Stat
          value={(latest_obs_st.air_temperature * 1.8 + 32).toFixed(1)}
          label="Temperature"
          unit="°F"
        />
      </div>
      <div id="humidity">
        <Stat
          value={latest_obs_st.relative_humidity}
          label="Humidity"
          unit="%"
        />
      </div>
      <div id="feelslike">
        <Stat
          value={(summary.feels_like * 1.8 + 32).toFixed(1)}
          label="Feels Like"
          unit="°F"
        />
      </div>
      <div id="anemometer">
        <Windchart
          rapid_wind={rapid_wind.map((e) => ({ ...e, mps: e.mps * 2.237 }))}
        />
      </div>
      <div id="windgraph">
        <Graph
          label="Winds"
          values={obs_st.map((e) => ({
            time: e.time,
            wind_lull: e.wind_lull * 2.237,
            wind_avg: e.wind_avg * 2.237,
            wind_gust: e.wind_gust * 2.237,
          }))}
        />
      </div>
      <div id="rest"><RapWindsAloft lat={33.97} lng={-84.98} elev={330} /></div>
    </div>
  );
};

export default App;
