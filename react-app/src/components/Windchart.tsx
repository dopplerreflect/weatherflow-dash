import React from "react";
import "./Windchart.css";

const hueForSpeed = (mph: number) => {
  if (mph >= 25) {
    return -82.5;
  }
  return 230 - Number(mph) * 12.5;
};
interface Props {
  rapid_wind: DecodedRapidWind[];
}

const Windchart: React.FC<Props> = ({ rapid_wind }) => {
  let latestDir = 0;
  let latestMps = 0;
  let maxMps: any;
  let ringRadii: number[] = [];

  try {
    const latest = rapid_wind[rapid_wind.length - 1];
    latestMps = latest.mps;
    latestDir = latest.dir;
    maxMps = Math.max(...rapid_wind.map((e, i) => e.mps));

    ringRadii = Array.from({ length: Math.ceil(maxMps) })
      .map((_, i) => {
        const div = maxMps > 5 ? 5 : 1;
        if (i % div === 0) {
          return i;
        }
        return -1;
      })
      .filter((v) => v !== -1)
      .slice(1);
  } catch (e) {
    console.log(e);
  }

  return (
    <svg
      id="Windchart"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 512 512`}
    >
      <defs>
        <line id="line" x1="256" y1="2" x2="256" y2="253.5" className="line" />
      </defs>

      <g>
        {ringRadii.map((i) => (
          <circle
            key={i}
            cx={256}
            cy={256}
            r={(256 / maxMps) * i}
            style={{
              fill: "transparent",
              stroke: `hsl(${hueForSpeed(i)}, 100%, 50%)`,
              strokeWidth: 1,
            }}
          />
        ))}
      </g>
      <g>
        {rapid_wind.map((rw, i) => (
          <circle
            key={i}
            cx={256 +
                (250 / maxMps) * rw.mps *
                  Math.cos((rw.dir - 90) * (Math.PI / 180)) || 256}
            cy={256 +
                (250 / maxMps) * rw.mps *
                  Math.sin((rw.dir - 90) * (Math.PI / 180)) || 256}
            r={3}
            style={{
              fill: `hsla(
                      ${hueForSpeed(rw.mps)},
                      ${(100 / rapid_wind.length) * i}%,
                      50%,
                      ${(1 / rapid_wind.length) * i})`,
            }}
          />
        ))}
      </g>

      {/* <rect id="speed-legend-bg" x="0" y="491" width="512" height="21" /> */}

      <g className="text">
        <text x="243" y="34">
          N
        </text>
        <text x="484" y="269">
          E
        </text>
        <text x="243" y="508">
          S
        </text>
        <text x="4" y="269">
          W
        </text>
      </g>

      <use href="#line" transform="rotate(22.5, 256, 256)" />
      <use href="#line" transform="rotate(67.5, 256, 256)" />
      <use href="#line" transform="rotate(112.5, 256, 256)" />
      <use href="#line" transform="rotate(157.5, 256, 256)" />
      <use href="#line" transform="rotate(202.5, 256, 256)" />
      <use href="#line" transform="rotate(247.5, 256, 256)" />
      <use href="#line" transform="rotate(292.5, 256, 256)" />
      <use href="#line" transform="rotate(337.5, 256, 256)" />

      {latestMps > 0 && (
        <g>
          <path
            className="direction-indicator"
            id="directionIndicator"
            d="M 258 35 L 260 256 L 314 314 L 256 480 L 197 314 L 252 256 L 254 35 Z"
            style={{ transform: `rotate(${latestDir}deg)` }}
          />

          <circle
            className="center-circle"
            id="centerCircle"
            cx="256"
            cy="256"
            r="82.9"
          />

          <text
            className="velocity-text"
            style={{
              stroke: `hsl(${hueForSpeed(latestMps)}, 100%, 50%)`,
              fill: `hsla(${hueForSpeed(latestMps)}, 100%, 50%, 0.25)`,
            }}
            id="velocityText"
            x="256"
            y="266"
          >
            {Math.round(latestMps)}
          </text>
          <text className="velocity-legend" x="256" y="325">
            {latestDir}°
          </text>
        </g>
      )}

      <circle className="ring" cx={256} cy={256} r={254} />

      <g id="speed-legend">
        {[0, 5, 10, 15, 20, 25].map((s, i) => (
          <text
            key={s}
            x={(512 / 6) * i + (512 / 12)}
            y={511}
            fill={`hsl(${hueForSpeed(s)}, 100%, 50%)`}
            fontSize="1.5em"
            textAnchor="middle"
          >
            {s}
          </text>
        ))}
      </g>
    </svg>
  );
};
export default Windchart;
