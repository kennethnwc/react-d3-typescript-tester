import { curveStepAfter, line, ScaleLinear, ScaleTime } from "d3";
import { Data } from "./App";

export const Marks: React.FC<{
  data: Data[];
  yScale: ScaleLinear<number, number, never>;
  xScale: ScaleTime<number, number, never>;
  yValue: (d: Data) => number;
  xValue: (d: Data) => Date;
  innerHeight?: number;
}> = ({ data, xScale, yScale, xValue, yValue, innerHeight = 0 }) => {
  const linePath =
    line<Data>()
      .x((d: Data) => xScale(xValue(d)))
      .y((d: Data) => yScale(yValue(d)))
      .curve(curveStepAfter)(data) || "";

  return (
    <>
      <path strokeWidth={3} fill="none" stroke="black" d={linePath} />
    </>
  );
};
