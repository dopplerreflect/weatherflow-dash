import React, { memo, useEffect, useState } from "react";
import "./RapWindsAloft.less";

const RapWindsAloft: React.FC<RAPWindsAloftProps> = (
  { latitude, longitude, elevation },
) => {
  const [data, setData]: [Partial<RAPWindsAloftData>, any] = useState({});

  const fetchWindsAloft = async (
    latitude: number,
    longitude: number,
    elevation: number,
  ) => {
    const result = await fetch(
      `https://deno-winds-aloft-json.herokuapp.com/${latitude}/${longitude}/${elevation}`,
    );
    const data = await result.json();
    setData(data);
  };

  useEffect(() => {
    fetchWindsAloft(latitude, longitude, elevation);
    const interval = setInterval(() => {
      console.log("fetching wa on interval");
      fetchWindsAloft(latitude, longitude, elevation);
    }, 1000 * 60 * 10);
    return () => clearInterval(interval);
  }, [latitude, longitude, elevation]);

  return (
    <div id="RAPWindsAloft">
      <div className="sounding header">
        <div className="center">Altitude</div>
        <div className="center">Speed</div>
        <div className="center">Direction</div>
        <div className="center">Temperature</div>
      </div>
      {data.soundings?.reverse().map((sounding, i) => (
        <div className="sounding" key={i}>
          <div className="center">{sounding.height.feet} ft.</div>
          <div className="center">{sounding.windSpd.mph} mph</div>
          <div className="center">
            <Arrow dir={sounding.windDir} />
          </div>
          <div className="center">{sounding.temp.f}°F</div>
        </div>
      ))}
      <div style={{ textAlign: "right" }}>
        {JSON.stringify({ latitude, longitude, elevation })}
      </div>
    </div>
  );
};

const Arrow: React.FC<{ dir: number }> = ({ dir }) => (
  <svg viewBox="0 0 100 100">
    <path
      d="M 50 100 L 0 25 L 25 30 V 0 H 75 V 30 L 100 25 Z"
      fill="hsl(30, 100%, 50%)"
      transform={`rotate(${dir}, 50, 50)`}
    />
    <text
      x={50}
      y={55}
      dominantBaseline="middle"
      textAnchor="middle"
      fill="hsl(210, 100%, 10%)"
      fontSize={36}
      fontWeight="bold"
    >
      {dir}°
    </text>
  </svg>
);
export default memo(RapWindsAloft);
