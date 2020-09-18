import React, { memo, useEffect, useState } from 'react';
import './RapWindsAloft.less';

const RapWindsAloft: React.FC<RAPWindsAloftProps> = ({
  latitude,
  longitude,
  elevation,
}) => {
  const [data, setData]: [Partial<RAPWindsAloftData>, any] = useState({});

  const fetchWindsAloft = async (
    latitude: number,
    longitude: number,
    elevation: number
  ) => {
    const result = await fetch(
      `https://deno-winds-aloft-json.herokuapp.com/${latitude}/${longitude}/${elevation}`
    );
    const data = await result.json();
    setData(data);
  };

  useEffect(() => {
    fetchWindsAloft(latitude, longitude, elevation);
    const interval = setInterval(() => {
      console.log('fetching wa on interval');
      fetchWindsAloft(latitude, longitude, elevation);
    }, 1000 * 60 * 10);
    return () => clearInterval(interval);
  }, [latitude, longitude, elevation]);

  const { type, hour, month, day, year } = data;

  return (
    <div id="RAPWindsAloft">
      <div className="sounding header">
        <div className="center">Altitude AGL</div>
        <div className="center">Speed</div>
        <div className="center">Direction</div>
        <div className="center">Temperature</div>
      </div>
      {data.soundings?.reverse().map((sounding, i) => (
        <div className="sounding" key={i}>
          <div className="center">{sounding.height.feet} ft.</div>
          <div className="center">{sounding.windSpd.mph} mph</div>
          <div className="center">
            <Arrow dir={sounding.windDir} />{' '}
            <div className="text">{sounding.windDir}°</div>
          </div>
          <div className="center">{sounding.temp.f}°F</div>
        </div>
      ))}
      <div
        style={{
          fontFamily: 'monospace',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {JSON.stringify({ hourUTC: hour, latitude, longitude, elevation })}
      </div>
    </div>
  );
};

const Arrow: React.FC<{ dir: number }> = ({ dir }) => (
  <svg viewBox="0 0 32 32">
    <circle
      cx="16"
      cy="16"
      r="15.5"
      stroke="hsl(210, 100%, 75%)"
      fill="hsl(210, 100%, 25%)"
    />
    <path
      d="M 16 31 L 11.686 20.313 L 15 16 L 15.75 1 H 16.25 L 17 16 L 20.314 20.313 Z"
      fill="hsl(30, 100%, 50%)"
      transform={`rotate(${dir}, 16, 16)`}
    />
    <text
      x="48"
      y="18"
      dominantBaseline="middle"
      textAnchor="middle"
      fill="hsl(210, 100%, 75%)"
      fontSize="0.6875em"
    >
      {dir}°
    </text>
  </svg>
);
export default memo(RapWindsAloft);
