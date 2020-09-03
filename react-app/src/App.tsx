import React, { useState, useContext } from "react";
import Guage from "./components/Guage";
import Stat from "./components/Stat";
import Windchart from "./components/Windchart";
import SocketContext from "./components/SocketContext/context";
import "./App.css";

const App = () => {
  const [value, setValue] = useState(0);
  const { summary, obs_st, rapid_wind } = useContext(SocketContext);
  const latest_obs_st = obs_st[obs_st.length - 1];
  const latest_rapid_wind = rapid_wind[rapid_wind.length - 1];
  return (
    <div id="App">
      <div>
        <Stat value={51.5} label="Temperature" unit="°F" />
      </div>
      <div>
        <Stat value={71.8} label="Humidity" unit="%" />
      </div>
      {/* <div>
        <Windchart
          rapid_wind={rapid_wind.map((e) => ({ ...e, mps: e.mps * 2.237 }))}
        />
      </div> */}
      <div>
        <Guage
          value={Number((latest_obs_st.air_temperature * 1.8 + 32).toFixed(1))}
          title="Temperature"
          unit="°F"
        />
      </div>
      <div>
        <Guage
          value={latest_obs_st.relative_humidity}
          title="Humidity"
          unit="%"
        />
      </div>
    </div>
  );
};

export default App;
