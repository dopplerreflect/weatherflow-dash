import React, { memo } from 'react';
import { hueForSpeed, opacityForAge } from '../utils';
import './Graph.css';

interface WindGraphProps {
  label: string;
  obs_st: DecodedObsSt[];
}

const Graph: React.FC<WindGraphProps> = function ({ obs_st }) {
  const values = obs_st.map(e => ({
    time: e.time,
    wind_lull: e.wind_lull * 2.237,
    wind_avg: e.wind_avg * 2.237,
    wind_gust: e.wind_gust * 2.237,
  }));

  const width = window.innerHeight * 0.75;
  const height = window.innerHeight * 0.25;
  const graphHeight = height - 21;
  const leftPad = 64;
  const graphWidth = width - leftPad - 6;
  let maxValue = Math.max(...values.map(v => v.wind_gust)) || 16;
  maxValue = maxValue < 6 ? 6 : maxValue;

  return (
    <svg
      id="Graph"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width={'100%'}
      height={'100%'}
    >
      <g id="y-axis-lines">
        {[...Array.from(Array(Math.ceil(maxValue)))].map((_, n) => {
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
                  x={leftPad + i * (graphWidth / values.length)}
                  y={graphHeight - (graphHeight / maxValue) * v.wind_gust}
                  width={graphWidth / values.length}
                  height={(graphHeight / maxValue) * v.wind_gust}
                  fill={`hsla(${hueForSpeed(v.wind_gust)}, 100%, 50%, 0.5)`}
                  stroke={`hsla(${hueForSpeed(v.wind_gust)}, 100%, 50%, 1)`}
                  opacity={opacityForAge(values.length, i)}
                />
                <line
                  x1={leftPad + i * (graphWidth / values.length)}
                  x2={
                    leftPad +
                    i * (graphWidth / values.length) +
                    graphWidth / values.length
                  }
                  y1={graphHeight - (graphHeight / maxValue) * v.wind_gust}
                  y2={graphHeight - (graphHeight / maxValue) * v.wind_gust}
                  stroke="white"
                  opacity={opacityForAge(values.length, i)}
                />
              </>
            )}
            {v.wind_avg && (
              <>
                <rect
                  x={leftPad + i * (graphWidth / values.length)}
                  y={graphHeight - (graphHeight / maxValue) * v.wind_avg}
                  width={graphWidth / values.length}
                  height={(graphHeight / maxValue) * v.wind_avg}
                  fill={`hsla(${hueForSpeed(v.wind_avg)}, 100%, 50%, 0.5)`}
                  stroke={`hsla(${hueForSpeed(v.wind_avg)}, 100%, 50%, 1)`}
                  opacity={opacityForAge(values.length, i)}
                />
                <line
                  x1={leftPad + i * (graphWidth / values.length)}
                  x2={
                    leftPad +
                    i * (graphWidth / values.length) +
                    graphWidth / values.length
                  }
                  y1={graphHeight - (graphHeight / maxValue) * v.wind_avg}
                  y2={graphHeight - (graphHeight / maxValue) * v.wind_avg}
                  stroke="white"
                  opacity={opacityForAge(values.length, i)}
                />
              </>
            )}
            {v.wind_lull && (
              <>
                <rect
                  x={leftPad + i * (graphWidth / values.length)}
                  y={graphHeight - (graphHeight / maxValue) * v.wind_lull}
                  width={graphWidth / values.length}
                  height={(graphHeight / maxValue) * v.wind_lull}
                  fill={`hsla(${hueForSpeed(v.wind_lull)}, 100%, 50%, 0.5)`}
                  stroke={`hsla(${hueForSpeed(v.wind_lull)}, 100%, 50%, 1)`}
                  opacity={opacityForAge(values.length, i)}
                />
                <line
                  x1={leftPad + i * (graphWidth / values.length)}
                  x2={
                    leftPad +
                    i * (graphWidth / values.length) +
                    graphWidth / values.length
                  }
                  y1={graphHeight - (graphHeight / maxValue) * v.wind_lull}
                  y2={graphHeight - (graphHeight / maxValue) * v.wind_lull}
                  stroke="white"
                  opacity={opacityForAge(values.length, i)}
                />
              </>
            )}
          </g>
        ))}
      </g>
      <g id="y-axis-legend">
        {[...Array.from(Array(Math.ceil(maxValue)))].map((_, n) => {
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
        <line
          y1={graphHeight}
          x2={width}
          y2={graphHeight}
          stroke="hsl(210, 50%, 50%)"
        />
        {values.map((_, i) => {
          const x =
            leftPad +
            graphWidth / values.length / 2 +
            i * (graphWidth / values.length);
          return (
            i % 5 === 0 &&
            i !== 0 && (
              <g className="x-axis-mark" key={i}>
                <line
                  x1={
                    leftPad +
                    graphWidth / values.length / 2 +
                    i * (graphWidth / values.length)
                  }
                  y1={graphHeight}
                  x2={
                    leftPad +
                    graphWidth / values.length / 2 +
                    i * (graphWidth / values.length)
                  }
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
