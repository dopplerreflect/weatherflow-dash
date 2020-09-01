import React, { useState, useContext } from "react";
import Guage from "./components/Guage";
import RangeControl from "./components/RangeControl";
import SocketContext from "./components/SocketContext/context";
import "./App.css";

const App = () => {
  const [value, setValue] = useState(88.8);
  const { summary, obs_st, rapid_wind } = useContext(SocketContext);

  return (
    <div id="App">
      <RangeControl value={value} setValue={setValue} />
      <Guage percent={value} title="Percent" />
    </div>
  );
};

export default App;
