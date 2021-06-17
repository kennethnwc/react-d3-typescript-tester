import { ScaleLinear } from "d3";
import React from "react";

type Props = {
  xScale: ScaleLinear<number, number, never>;
  innerHeight: number;
  tickFormat: (n: number) => string;
};

export const AxisBottom: React.FC<Props> = ({
  xScale,
  innerHeight,
  tickFormat,
}) => {
  return (
    <>
      {xScale
        .ticks()
        .filter((v) => v % 1 === 0)
        .map((tickValue) => (
          <g
            className="tick"
            key={tickValue}
            transform={`translate(${xScale(tickValue)}, 0)`}
          >
            <line y2={innerHeight} />
            <text
              dy="0.71em"
              y={innerHeight + 3}
              style={{ textAnchor: "middle" }}
            >
              {tickFormat(tickValue)}
            </text>
          </g>
        ))}
    </>
  );
};
