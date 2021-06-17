import { ScaleBand } from "d3";
import React from "react";

type Props = {
  yScale: ScaleBand<string>;
};

export const AxisLeft: React.FC<Props> = ({ yScale }) => {
  return (
    <>
      {yScale.domain().map((tickValue) => (
        <g className="tick" key={tickValue}>
          <text
            dy=".32em"
            style={{ textAnchor: "end" }}
            x={-3}
            y={(yScale(tickValue) || 0) + yScale.bandwidth() / 2}
          >
            {tickValue}
          </text>
        </g>
      ))}
    </>
  );
};
