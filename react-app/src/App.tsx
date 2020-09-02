import React, { useState, useContext } from "react";
import Guage from "./components/Guage";
import SocketContext from "./components/SocketContext/context";
import { last } from "./utils/last";
import "./App.css";

const App = () => {
  const [value, setValue] = useState(0);
  const { summary, obs_st, rapid_wind } = useContext(SocketContext);
  const latest_obs_st = obs_st[obs_st.length - 1];
  const latest_rapid_wind = rapid_wind[rapid_wind.length - 1];
  return (
    <div id="App">
      <div>
        <Guage
          percent={latest_rapid_wind.mps * 2.237}
          title="Wind Speed"
          unit="mph"
        />
      </div>
      <div>
        <Guage
          percent={Math.round(latest_obs_st.air_temperature * (9 / 5) + 32)}
          title="Temperature"
          unit="°F"
        />
      </div>
      <div>
        <Guage
          percent={latest_obs_st.relative_humidity}
          title="Humidity"
          unit="%"
        />
      </div>
    </div>
  );
};

export default App;
