import React, { memo, useEffect, useState } from "react";
import "./RapWindsAloft.less";

type Props = {
  lat: number;
  lng: number;
  elev?: number;
};

type Sounding = {
  linType: number;
  pressure: number;
  height: {
    meters: number;
    feet: number;
  };
  temp: {
    c: number;
    f: number;
  };
  dewPt: {
    c: number;
    f: number;
  };
  windDir: number;
  windSpd: {
    kts: number;
    mph: number;
  };
};

type Data = {
  latitude: number;
  longitude: number;
  soundings: Sounding[];
};

const RapWindsAloft: React.FC<Props> = ({ lat, lng, elev }) => {
  const [data, setData]: [Partial<Data>, any] = useState({});

  const fetchWindsAloft = async (lat: number, lng: number, elev = 0) => {
    const result = await fetch(
      `https://deno-winds-aloft-json.herokuapp.com/${lat}/${lng}/${elev}`,
    );
    const data = await result.json();
    setData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchWindsAloft(lat, lng, elev);
  }, [lat, lng, elev]);

  return (
    <div id="RAPWindsAloft">
      <div className="sounding">
        <div className="center">Altitude</div>
        <div className="center">Direction</div>
        <div className="center">Speed</div>
        {/* <div className="center">Direction</div> */}
        <div className="center">Temperature</div>
      </div>
      {data.soundings?.reverse().map((sounding, i) => (
        <div className="sounding" key={i}>
          <div className="center">{sounding.height.feet} ft.</div>
          <div className="center">
            <Arrow dir={sounding.windDir} speed={sounding.windSpd.mph} />
          </div>
          <div className="center">{sounding.windSpd.mph} mph</div>
          {/* <div className="center">{sounding.windDir}°</div> */}
          <div className="center">{sounding.temp.f}°F</div>
        </div>
      ))}
    </div>
  );
};

const Arrow: React.FC<{ dir: number; speed: number }> = ({ dir, speed }) => (
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
