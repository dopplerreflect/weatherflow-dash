import React from "react";

type Props = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

const RangeControl = ({ value, setValue }: Props) => (
  <input
    id="RangeControl"
    type="range"
    min={0}
    max={100}
    step={0.1}
    value={value}
    onChange={(e) => setValue(Number(e.target.value))}
  />
);

export default RangeControl;
