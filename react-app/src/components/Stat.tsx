import React from "react";
import "./Stat.css";

interface Props {
  value: number;
  label?: string;
  unit?: string;
}

const Stat: React.FC<Props> = ({ value, label, unit }) => {
  return (
    <svg id="Stat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 128">
      <rect
        id="background"
        x={1}
        y={1}
        width={254}
        height={126}
        rx={8}
      />
      <text id="label" x={128} y={35}>{label}</text>
      <text id="value" x={128} y={84} dominantBaseline="middle">
        {value}
        {unit && ` ${unit}`}
      </text>
    </svg>
  );
};

export default Stat;
