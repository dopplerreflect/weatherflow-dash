import React, { memo } from "react";
import "./Graph.css";

const width = 256,
  height = 158.2464,
  graphHeight = 100;

interface GraphProps {
  label: string;
  values: DecodedObsSt[];
}

const Graph: React.FC<GraphProps> = ({ label, values }) => {
  const maxValue = Math.max(...values.map((v) => v.wind_gust)) || 5;
  console.log({ maxValue });
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
      {values.map((v, i) => (
        <g key={i} id="bar-graph">
          {v.wind_gust && (
            <rect
              x={2 + i * ((width - 4) / values.length)}
              y={135 - ((graphHeight / maxValue) * v.wind_gust)}
              width={(width - 4) / values.length}
              height={(graphHeight / maxValue) * v.wind_gust}
              fill={`hsl(0, 100%, 50%)`}
            />
          )}
          {v.wind_avg && (
            <rect
              x={2 + i * ((width - 4) / values.length)}
              y={135 - ((graphHeight / maxValue) * v.wind_avg)}
              width={(width - 4) / values.length}
              height={(graphHeight / maxValue) * v.wind_avg}
              fill={`hsl(270, 100%, 50%)`}
            />
          )}
          {v.wind_lull && (
            <rect
              x={2 + i * ((width - 4) / values.length)}
              y={135 - ((graphHeight / maxValue) * v.wind_lull)}
              width={(width - 4) / values.length}
              height={(graphHeight / maxValue) * v.wind_lull}
              fill={`hsl(180, 100%, 50%)`}
            />
          )}
        </g>
      ))}
    </svg>
  );
};

export default memo(Graph);
