import { axisBottom, ScaleTime, select } from "d3";
import React, { useEffect, useRef } from "react";

type Props = {
  xScale: ScaleTime<number, number, never>;
  innerHeight?: number;
};

export const AxisBottom: React.FC<Props> = ({ xScale, innerHeight = 100 }) => {
  const ref = useRef<SVGGElement>(null);
  const xAxis = axisBottom(xScale).ticks(5);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).append("g").call(xAxis);
    }
  }, [xAxis]);
  console.log(xAxis);

  return <g ref={ref} transform={`translate(0, ${innerHeight})`}></g>;
};
