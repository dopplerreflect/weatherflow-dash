import React, { memo } from "react";
import "./Stat.css";

/**
 * Shows a singe stat
 *
 * @param {number|string} value - value of stat
 * @param {string} unit - measurement unit to be displayed next to value e.g. °F, %
 * @param {string} label - Text label
 */
interface StatProps {
  label: string;
  value: number | string;
  unit?: string;
}

const Stat: React.FC<StatProps> = ({ label, value, unit }) => {
  console.log("Rendering Stat");
  return (
    <svg id="Stat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      {/* <rect id='background' x={1} y={1} width={254} height={254} rx={8} /> */}
      <text id="label" x={128} y={30}>
        {label}
      </text>
      <text id="value" x={128} y={144} dominantBaseline="middle">
        {value}
        {unit && ` ${unit}`}
      </text>
    </svg>
  );
};

export default memo(Stat);
