import React, { memo, useState } from "react";
import "./Graph.css";

const hueForSpeed = (mph: number) => {
  if (mph >= 25) {
    return -82.5;
  }
  return 230 - Number(mph) * 12.5;
};

// const width = 512,
//   height = 316.4928,
//   graphHeight = (height / 9) * 6;

interface WindGraphProps {
  label: string;
  values: Array<{
    time: number;
    wind_gust: number;
    wind_avg: number;
    wind_lull: number;
  }>;
}

const Graph: React.FC<WindGraphProps> = function ({ label, values }) {
  const width = window.innerHeight * 0.75;
  const height = window.innerHeight * 0.25;
  const graphHeight = height - 21;
  let maxValue = Math.max(...values.map((v) => v.wind_gust)) || 16;
  maxValue = maxValue < 6 ? 6 : maxValue;
  return (
    <svg
      id="Graph"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width={"100%"}
      height={"100%"}
    >
      <g id="y-axis-lines">
        {[...Array.from(Array(25))].map((_, n) => {
          const y = n + 1;
          if (y < maxValue) {
            return (
              <line
                key={n}
                x1={2}
                y1={graphHeight - (graphHeight / maxValue) * y}
                x2={width - 2}
                y2={graphHeight - (graphHeight / maxValue) * y}
                stroke={`hsl(${hueForSpeed(y)}, 100%, 50%)`}
              />
            );
          }
        })}
      </g>

      <g id="bar-graph">
        {values.map((v, i) => (
          <g key={i} className="bar">
            {v.wind_gust && (
              <>
                <rect
                  x={2 + i * ((width - 6) / values.length)}
                  y={graphHeight - (graphHeight / maxValue) * v.wind_gust}
                  width={(width - 6) / values.length}
                  height={(graphHeight / maxValue) * v.wind_gust}
                  fill={`hsla(${hueForSpeed(v.wind_gust)}, 100%, 50%, 0.5)`}
                  stroke={`hsla(${hueForSpeed(v.wind_gust)}, 100%, 50%, 1)`}
                />
                <line
                  x1={2 + i * ((width - 6) / values.length)}
                  x2={2 +
                    i * ((width - 6) / values.length) +
                    (width - 6) / values.length}
                  y1={graphHeight - (graphHeight / maxValue) * v.wind_gust}
                  y2={graphHeight - (graphHeight / maxValue) * v.wind_gust}
                  stroke="white"
                />
              </>
            )}
            {v.wind_avg && (
              <>
                <rect
                  x={2 + i * ((width - 6) / values.length)}
                  y={graphHeight - (graphHeight / maxValue) * v.wind_avg}
                  width={(width - 6) / values.length}
                  height={(graphHeight / maxValue) * v.wind_avg}
                  fill={`hsla(${hueForSpeed(v.wind_avg)}, 100%, 50%, 0.5)`}
                  stroke={`hsla(${hueForSpeed(v.wind_avg)}, 100%, 50%, 1)`}
                />
                <line
                  x1={2 + i * ((width - 6) / values.length)}
                  x2={2 +
                    i * ((width - 6) / values.length) +
                    (width - 6) / values.length}
                  y1={graphHeight - (graphHeight / maxValue) * v.wind_avg}
                  y2={graphHeight - (graphHeight / maxValue) * v.wind_avg}
                  stroke="white"
                />
              </>
            )}
            {v.wind_lull && (
              <>
                <rect
                  x={2 + i * ((width - 6) / values.length)}
                  y={graphHeight - (graphHeight / maxValue) * v.wind_lull}
                  width={(width - 6) / values.length}
                  height={(graphHeight / maxValue) * v.wind_lull}
                  fill={`hsla(${hueForSpeed(v.wind_lull)}, 100%, 50%, 0.5)`}
                  stroke={`hsla(${hueForSpeed(v.wind_lull)}, 100%, 50%, 1)`}
                />
                <line
                  x1={2 + i * ((width - 6) / values.length)}
                  x2={2 +
                    i * ((width - 6) / values.length) +
                    (width - 6) / values.length}
                  y1={graphHeight - (graphHeight / maxValue) * v.wind_lull}
                  y2={graphHeight - (graphHeight / maxValue) * v.wind_lull}
                  stroke="white"
                />
              </>
            )}
          </g>
        ))}
      </g>
      <g id="y-axis-legend">
        {[...Array.from(Array(25))].map((_, n) => {
          const y = n + 1;
          if (
            y < maxValue &&
            (maxValue === 6 ? true : y % Math.round(maxValue / 5) === 0)
          ) {
            return (
              <text
                key={n}
                x={2}
                y={graphHeight - (graphHeight / maxValue) * y}
                fill="white"
                fontWeight="bold"
                dominantBaseline="middle"
              >
                {y}mph
              </text>
            );
          }
        })}
      </g>
      <g id="x-axis-legend">
        {values.map((_, i) => {
          const x = 2 +
            (width - 6) / values.length / 2 +
            i * ((width - 6) / values.length);
          return (
            i % 10 === 0 &&
            i !== 0 && (
              <g className="x-axis-mark" key={i}>
                <line
                  x1={2 +
                    (width - 6) / values.length / 2 +
                    i * ((width - 6) / values.length)}
                  y1={graphHeight}
                  x2={2 +
                    (width - 6) / values.length / 2 +
                    i * ((width - 6) / values.length)}
                  y2={graphHeight + 5}
                  stroke="white"
                />
                <text
                  x={x}
                  y={graphHeight + 16}
                  fill="white"
                  textAnchor="middle"
                >
                  {values.length - i}min
                </text>
              </g>
            )
          );
        })}
      </g>
    </svg>
  );
};

export default memo(Graph);
