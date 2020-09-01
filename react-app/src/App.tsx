import React, { useState, useContext } from "react";
import Guage from "./components/Guage";
import SocketContext from "./components/SocketContext/context";
import "./App.css";

const App = () => {
  const [value, setValue] = useState(0);
  const { summary, obs_st, rapid_wind } = useContext(SocketContext);
  return (
    <div id="App">
      <Guage
        percent={obs_st[obs_st.length - 1].relativeHumidity}
        title="Humidity"
      />
    </div>
  );
};

export default App;
