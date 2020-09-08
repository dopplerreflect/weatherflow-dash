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
  let maxValue = Math.max(...values.map((v) => v.wind_gust)) || 16;
  maxValue = maxValue < 6 ? 6 : maxValue;
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
      <g id="y-axis-lines">
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

      <g id="bar-graph">
        {values.map((v, i) => (
          <g key={i} className="bar">
            {v.wind_gust && (
              <>
                <rect
                  x={2 + i * ((width - 6) / values.length)}
                  y={graphHeight + 35 -
                    ((graphHeight / maxValue) * v.wind_gust)}
                  width={(width - 6) / values.length}
                  height={(graphHeight / maxValue) * v.wind_gust}
                  fill={`hsla(${hueForSpeed(v.wind_gust)}, 100%, 50%, 0.5)`}
                  stroke={`hsla(${hueForSpeed(v.wind_gust)}, 100%, 50%, 1)`}
                />
                <line
                  x1={2 + i * ((width - 6) / values.length)}
                  x2={(2 + i * ((width - 6) / values.length)) +
                    ((width - 6) / values.length)}
                  y1={graphHeight + 35 -
                    ((graphHeight / maxValue) * v.wind_gust)}
                  y2={graphHeight + 35 -
                    ((graphHeight / maxValue) * v.wind_gust)}
                  stroke="white"
                />
              </>
            )}
            {v.wind_avg && (
              <>
                <rect
                  x={2 + i * ((width - 6) / values.length)}
                  y={graphHeight + 35 - ((graphHeight / maxValue) * v.wind_avg)}
                  width={(width - 6) / values.length}
                  height={(graphHeight / maxValue) * v.wind_avg}
                  fill={`hsla(${hueForSpeed(v.wind_avg)}, 100%, 50%, 0.5)`}
                  stroke={`hsla(${hueForSpeed(v.wind_avg)}, 100%, 50%, 1)`}
                />
                <line
                  x1={2 + i * ((width - 6) / values.length)}
                  x2={(2 + i * ((width - 6) / values.length)) +
                    ((width - 6) / values.length)}
                  y1={graphHeight + 35 -
                    ((graphHeight / maxValue) * v.wind_avg)}
                  y2={graphHeight + 35 -
                    ((graphHeight / maxValue) * v.wind_avg)}
                  stroke="white"
                />
              </>
            )}
            {v.wind_lull && (
              <>
                <rect
                  x={2 + i * ((width - 6) / values.length)}
                  y={graphHeight + 35 -
                    ((graphHeight / maxValue) * v.wind_lull)}
                  width={(width - 6) / values.length}
                  height={(graphHeight / maxValue) * v.wind_lull}
                  fill={`hsla(${hueForSpeed(v.wind_lull)}, 100%, 50%, 0.5)`}
                  stroke={`hsla(${hueForSpeed(v.wind_lull)}, 100%, 50%, 1)`}
                />
                <line
                  x1={2 + i * ((width - 6) / values.length)}
                  x2={(2 + i * ((width - 6) / values.length)) +
                    ((width - 6) / values.length)}
                  y1={graphHeight + 35 -
                    ((graphHeight / maxValue) * v.wind_lull)}
                  y2={graphHeight + 35 -
                    ((graphHeight / maxValue) * v.wind_lull)}
                  stroke="white"
                  strokeWidth={7}
                />
              </>
            )}
          </g>
        ))}
      </g>
      <g id="y-axis-legend">
        {[...Array.from(Array(25))].map((_, n) => {
          const y = (n + 1);
          if (y < maxValue && maxValue === 6 ? true : y % 5 === 0) {
            return (<text
              key={n}
              x={2}
              y={graphHeight + 35 - (graphHeight / maxValue) * y}
              // stroke={`hsla(210, 50%, 0%, 0.9)`}
              fill={`hsl(${hueForSpeed(y)}, 100%, 50%)`}
              fontSize={`0.5em`}
              fontWeight="bold"
              dominantBaseline="middle"
            >
              {y}mph
            </text>);
          }
        })}
      </g>
      <g id="x-axis-legend">
        {values.map((_, i) => {
          const x = (2 + (((width - 6) / values.length) / 2) +
            i * ((width - 6) / values.length));
          return i % 10 === 0 && i !== 0 && (
            <g className="x-axis-mark">
              <line
                x1={2 + (((width - 6) / values.length) / 2) +
                  i * ((width - 6) / values.length)}
                y1={graphHeight + 36}
                x2={2 + (((width - 6) / values.length) / 2) +
                  i * ((width - 6) / values.length)}
                y2={graphHeight + 45}
                stroke="white"
              />
              <text
                x={x}
                y={graphHeight + 52}
                fill="white"
                textAnchor="middle"
                fontSize={`0.5em`}
              >
                {values.length - i}min
              </text>
              {/* <text
                x={width / 2}
                y={height - 16}
                fill="white"
                textAnchor="middle"
              >
                Minutes Ago
              </text> */}
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default memo(Graph);
