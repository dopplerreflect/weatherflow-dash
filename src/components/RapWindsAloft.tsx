import React, { memo, useEffect, useState } from "react";
import "./RapWindsAloft.less";

const RapWindsAloft: React.FC<RAPWindsAloftProps> = ({
  latitude,
  longitude,
  elevation,
}) => {
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

  const { type, hour, month, day, year } = data;

  const surface = data.soundings?.find((s) => s.linType === 9);

  return (
    <div id="RAPWindsAloft">
      <div className="sounding header">
        <div className="center">Winds Aloft</div>
      </div>
      {data.soundings?.reverse().map((sounding, i) => (
        <div className="sounding" key={i}>
          <div className="center">{sounding.height.feet} ft.</div>
          <div className="center">{sounding.windSpd.mph} mph</div>
          <Arrow dir={sounding.windDir} />
          <div className="center">{sounding.windDir}°</div>
          <div className="center">{sounding.temp.f}°F</div>
        </div>
      ))}
      <div
        style={{
          // fontFamily: "monospace",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/*JSON.stringify({ hourUTC: hour, latitude, longitude, elevation })*/}
        {surface &&
          `Predicted Cloud base: ${
            Math.round((surface.temp.c - surface.dewPt.c) / 2.5 * 1000)
          } ft`}
      </div>
    </div>
  );
};

const Arrow: React.FC<{ dir: number }> = ({ dir }) => (
  <svg viewBox="0 0 512 512" height="2em" width="2em">
    <circle
      cx="256"
      cy="256"
      r="232"
      stroke="hsl(210, 100%, 75%)"
      strokeWidth={48}
      fill="hsl(210, 100%, 25%)"
    />
    <path
      d="
      M 260 0 
      L 269.56814564470153 251.59144223867975 
      L 313.475583094649 335.1083534400135 
      L 256 512 
      L 198.52441690535102 335.1083534400135 
      L 242.4318543552985 251.59144223867975 
      L 252 0
      Z"
      fill="hsl(30, 100%, 50%)"
      transform={`rotate(${dir}, 256, 256)`}
    />
  </svg>
);
export default memo(RapWindsAloft);
