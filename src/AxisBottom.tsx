import { ScaleBand } from "d3";
import React from "react";

type Props = {
  xScale: ScaleBand<string>;
  innerHeight?: number;
};

export const AxisBottom: React.FC<Props> = ({ xScale, innerHeight = 100 }) => {
  return (
    <>
      {xScale
        .domain()
        .filter((_, i) => i % 2 === 0)
        .map((tickValue) => (
          <g className="tick" key={tickValue}>
            <text
              dy=".32em"
              style={{ textAnchor: "middle" }}
              x={(xScale(tickValue) || 0) + xScale.bandwidth() / 2}
              y={innerHeight + 10}
            >
              {tickValue}
            </text>
          </g>
        ))}
    </>
  );
};
