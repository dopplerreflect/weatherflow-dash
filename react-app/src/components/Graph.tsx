import React, { memo } from "react";
import "./Graph.css";

const hueForSpeed = (mph: number) => {
  if (mph >= 25) {
    return -82.5;
  }
  return 230 - Number(mph) * 12.5;
};

const width = 256,
  height = 158.2464,
  graphHeight = 100;

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
      <text id="label" x={128} y={30}>{label}</text>
      <rect id="graph-bg" x={2} y={35} width={width - 4} height={graphHeight} />
      <g>
        {[...Array.from(Array(25))].map((_, n) => {
          const y = (n + 1);
          if (y < maxValue) {
            console.log({ y });
            return <line
              key={n}
              x1={2}
              y1={135 - (graphHeight / maxValue) * y}
              x2={254}
              y2={135 - (graphHeight / maxValue) * y}
              stroke={`hsl(${hueForSpeed(y)}, 100%, 50%)`}
            />;
          }
        })}
      </g>

      {values.map((v, i) => (
        <g key={i} id="bar-graph">
          {v.wind_gust && (
            <rect
              x={2 + i * ((width - 4) / values.length)}
              y={135 - ((graphHeight / maxValue) * v.wind_gust)}
              width={(width - 4) / values.length}
              height={(graphHeight / maxValue) * v.wind_gust}
              fill={`hsl(${hueForSpeed(v.wind_gust)}, 50%, 50%)`}
              stroke={`hsl(${hueForSpeed(v.wind_gust)}, 100%, 75%)`}
            />
          )}
          {v.wind_avg && (
            <rect
              x={2 + i * ((width - 4) / values.length)}
              y={135 - ((graphHeight / maxValue) * v.wind_avg)}
              width={(width - 4) / values.length}
              height={(graphHeight / maxValue) * v.wind_avg}
              fill={`hsl(${hueForSpeed(v.wind_avg)}, 50%, 50%)`}
              stroke={`hsl(${hueForSpeed(v.wind_avg)}, 100%, 87.5%)`}
            />
          )}
          {v.wind_lull && (
            <rect
              x={2 + i * ((width - 4) / values.length)}
              y={135 - ((graphHeight / maxValue) * v.wind_lull)}
              width={(width - 4) / values.length}
              height={(graphHeight / maxValue) * v.wind_lull}
              fill={`hsl(${hueForSpeed(v.wind_lull)}, 50%, 50%)`}
              stroke={`hsl(${hueForSpeed(v.wind_lull)}, 100%, 100%)`}
            />
          )}
        </g>
      ))}
    </svg>
  );
};

export default memo(Graph);
