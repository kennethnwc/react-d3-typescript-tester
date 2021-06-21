import { ScaleLinear } from "d3";
import React from "react";

type Props = {
  yScale: ScaleLinear<number, number, never>;
  innerWidth: number;
  tickFormat: (n: number) => string;
};

export const AxisLeft: React.FC<Props> = ({ yScale, innerWidth }) => {
  return (
    <>
      {yScale.ticks().map((tickValue) => (
        <g
          className="tick"
          key={tickValue}
          transform={`translate(0, ${yScale(tickValue)})`}
        >
          <line x2={innerWidth} />
          <text x={-30}>{tickValue}</text>
        </g>
      ))}
    </>
  );
};
