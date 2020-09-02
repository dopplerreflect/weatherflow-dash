import React from "react";
import "./Guage.css";

const calcXY = (angle: number, radius = 50, center = 128) => {
  const radians = (angle * Math.PI) / 180;
  const x = center + radius * Math.cos(radians);
  const y = center + radius * Math.sin(radians);
  return { x, y };
};
type Props = {
  percent: number;
  title: string;
  unit?: string;
};

const Guage = ({ percent, title, unit = "" }: Props) => {
  const { x: x1, y: y1 } = calcXY(0, 121.6);
  const { x: x2, y: y2 } = calcXY(270, 121.6);
  const { x: x3, y: y3 } = calcXY(270, 79);
  const { x: x4, y: y4 } = calcXY(0, 79);

  const { x: lx1, y: ly1 } = calcXY(2.7 * percent, 120);
  const { x: lx2, y: ly2 } = calcXY(2.7 * percent - 5, 80.5);
  const { x: lx3, y: ly3 } = calcXY(2.7 * percent + 5, 80.5);

  return (
    <svg
      id="Guage"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 256 256`}
    >
      <g transform={`rotate(135, 128, 128)`}>
        <circle
          id="background-circle"
          cx={128}
          cy={128}
          r={127}
        />
        <path
          id="needle"
          d={`M ${lx1} ${ly1} L ${lx2} ${ly2} 
          A 80.5 80.5 0 0 1 ${lx3} ${ly3} Z`}
          strokeWidth={1.5}
        />
        <path
          id="range"
          d={`
            M 0 128 A 128 128 0 1 0 0 127.9 Z
            M ${x1} ${y1} 
            A ${121.6} ${121.6} 1 1 1 ${x2} ${y2}
            L ${x3} ${y3}
            A ${79} ${79} 0 1 0 ${x4} ${y4}
            Z

        `}
        />
      </g>
      <text
        id="value"
        x={127}
        y={127}
        fontSize="48px"
        dominantBaseline="middle"
      >
        {percent}
      </text>
      <text
        id="title"
        x={127}
        y={calcXY(135, 121.6)["y"]}
        fontSize="24px"
        fontWeight="bold"
        dominantBaseline="middle"
      >
        {title}
      </text>
      <text
        id="unit"
        x={127}
        y={calcXY(135, 121.6)["y"] + 24}
        fontSize="18px"
        dominantBaseline="middle"
      >
        {unit}
      </text>
    </svg>
  );
};

export default Guage;
