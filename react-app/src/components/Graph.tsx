import React, { memo } from "react";
import "./Graph.css";

const hueForSpeed = (mph: number) => {
  if (mph >= 25) {
    return -82.5;
  }
  return 230 - Number(mph) * 12.5;
};

const width = 512,
  height = 316.4928,
  graphHeight = (height / 9) * 6;

interface WindGraphProps {
  label: string;
  values: Array<{
    time: number;
    wind_gust: number;
    wind_avg: number;
    wind_lull: number;
  }>;
}

const Graph: React.FC<WindGraphProps> = ({ label, values }) => {
  const maxValue = Math.max(...values.map((v) => v.wind_gust)) || 5;
  return (
    <svg
      id="Graph"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
    >
      <rect
        id="background"
        x={1}
        y={1}
        width={width - 2}
        height={height - 2}
        rx={8}
      />
      <text id="label" x={width / 2} y={height / 11}>{label}</text>
      <rect id="graph-bg" x={2} y={35} width={width - 4} height={graphHeight} />
      <g>
        {[...Array.from(Array(25))].map((_, n) => {
          const y = (n + 1);
          if (y < maxValue) {
            return <line
              key={n}
              x1={2}
              y1={graphHeight + 35 - (graphHeight / maxValue) * y}
              x2={width - 2}
              y2={graphHeight + 35 - (graphHeight / maxValue) * y}
              stroke={`hsl(${hueForSpeed(y)}, 100%, 50%)`}
            />;
          }
        })}
      </g>

      {values.map((v, i) => (
        <g key={i} id="bar-graph">
          {v.wind_gust && (
            <rect
              x={2 + i * ((width - 6) / values.length)}
              y={graphHeight + 35 - ((graphHeight / maxValue) * v.wind_gust)}
              width={(width - 6) / values.length}
              height={(graphHeight / maxValue) * v.wind_gust}
              fill={`hsl(${hueForSpeed(v.wind_gust)}, 100%, 50%)`}
              stroke={`hsla(${hueForSpeed(v.wind_gust)}, 100%, 50%, 1)`}
            />
          )}
          {v.wind_avg && (
            <rect
              x={2 + i * ((width - 6) / values.length)}
              y={graphHeight + 35 - ((graphHeight / maxValue) * v.wind_avg)}
              width={(width - 6) / values.length}
              height={(graphHeight / maxValue) * v.wind_avg}
              fill={`hsl(${hueForSpeed(v.wind_avg)}, 100%, 50%)`}
              stroke={`hsla(${hueForSpeed(v.wind_avg)}, 100%, 50%, 1)`}
            />
          )}
          {v.wind_lull && (
            <rect
              x={2 + i * ((width - 6) / values.length)}
              y={graphHeight + 35 - ((graphHeight / maxValue) * v.wind_lull)}
              width={(width - 6) / values.length}
              height={(graphHeight / maxValue) * v.wind_lull}
              fill={`hsl(${hueForSpeed(v.wind_lull)}, 100%, 50%)`}
              stroke={`hsla(${hueForSpeed(v.wind_lull)}, 100%, 50%, 1)`}
            />
          )}
        </g>
      ))}
    </svg>
  );
};

export default memo(Graph);
