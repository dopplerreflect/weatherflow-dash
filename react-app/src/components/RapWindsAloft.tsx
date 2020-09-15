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
      {data.soundings?.reverse().map((sounding, i) => (
        <div className="sounding" key={i}>
          <div className="center">{sounding.height.feet} ft.</div>
          <div className="center">
            <Arrow dir={sounding.windDir} speed={sounding.windSpd.mph} />
          </div>
          <div className="center">{sounding.temp.f} °F</div>
        </div>
      ))}
    </div>
  );
};

const Arrow: React.FC<{ dir: number; speed: number }> = ({ dir, speed }) => (
  <svg viewBox="0 0 100 100">
    <path
      d="M 50 100 L 0 25 L 25 30 V 0 H 75 V 30 L 100 25 Z"
      fill="hsl(210, 50%, 70%)"
      stroke="black"
      transform={`rotate(${dir}, 50, 50)`}
    />
    <text
      x={50}
      y={50}
      alignmentBaseline="middle"
      textAnchor="middle"
      fill="hsl(210, 50%, 20%)"
      fontSize={50}
      fontWeight="bold"
    >
      {speed}
    </text>
  </svg>
);
export default memo(RapWindsAloft);
