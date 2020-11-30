import React, { useContext, useEffect, useState } from 'react';
import Windchart from './components/Windchart';
import Graph from './components/Graph';
import RapWindsAloft from './components/RapWindsAloft';
import SocketContext from './components/SocketContext/context';
import QRCode from './public/qrcode.svg';
import './App.css';

const App = () => {
  const { obs_st, rapid_wind, summary } = useContext(SocketContext);
  const latest_obs_st = obs_st[obs_st.length - 1];
  const [sunset, setSunset] = useState('???');

  const fetchSunset = async () => {
    const host =
      document.location.hostname === 'localhost'
        ? 'http://localhost:3001'
        : `${document.location.protocol}//${document.location.host}`;
    const url = `${host}/sunset`;
    const result = await fetch(url);
    const data = await result.json();
    setSunset(
      new Date(data.results.sunset).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      })
    );
  };

  useEffect(() => {
    fetchSunset();
  }, []);

  return (
    <div id="App">
      <div id="header">
        <div id="temp">
          {(latest_obs_st.air_temperature * 1.8 + 32).toFixed(1)} °F
        </div>
        <div id="sunset">Sunset: {sunset}</div>
      </div>
      <div id="anemometer">
        <Windchart
          rapid_wind={rapid_wind.map(e => ({ ...e, mps: e.mps * 2.237 }))}
        />
      </div>
      <div id="windgraph">
        <Graph label="Winds" obs_st={obs_st} />
      </div>
      <div id="windsaloft">
        <RapWindsAloft />
      </div>
      <div id="qrcode" style={{ backgroundColor: 'white' }}>
        <img src={QRCode} />
      </div>
    </div>
  );
};

export default App;
