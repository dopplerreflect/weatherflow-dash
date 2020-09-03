import React, { useContext } from "react";
import Stat from "./components/Stat";
import Windchart from "./components/Windchart";
import Graph from "./components/Graph";
import SocketContext from "./components/SocketContext/context";
import "./App.css";

const App = () => {
  const { obs_st, rapid_wind } = useContext(SocketContext);
  const latest_obs_st = obs_st[obs_st.length - 1];
  return (
    <div id="App">
      <div className="container flex-column">
        <div className="flex-row">
          <div>
            <Stat
              value={(latest_obs_st.air_temperature * 1.8 + 32).toFixed(1)}
              label="Temperature"
              unit="°F"
            />
          </div>
          <div>
            <Stat
              value={latest_obs_st.relative_humidity}
              label="Humidity"
              unit="%"
            />
          </div>
        </div>
        <div>
          <Windchart
            rapid_wind={rapid_wind.map((e) => ({ ...e, mps: e.mps * 2.237 }))}
          />
        </div>
        <div>
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
      </div>
    </div>
  );
};

export default App;
