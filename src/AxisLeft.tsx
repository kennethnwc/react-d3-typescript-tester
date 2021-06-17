import { ScaleLinear } from "d3";
import React from "react";

type Props = {
  yScale: ScaleLinear<number, number, never>;
  innerWidth: number;
  tickOffset?: number;
};

export const AxisLeft: React.FC<Props> = ({
  yScale,
  innerWidth,
  tickOffset = 3,
}) => {
  return (
    <>
      {yScale.ticks().map((tickValue, i) => (
        <g
          key={`${tickValue}_${i}`}
          className="tick"
          transform={`translate(0, ${yScale(tickValue)})`}
        >
          <line x2={innerWidth} />
          <text dy=".32em" style={{ textAnchor: "end" }} x={-tickOffset}>
            {tickValue}
          </text>
        </g>
      ))}
    </>
  );
};
