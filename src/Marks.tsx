import { ScaleBand, ScaleLinear } from "d3";
import { Data } from "./App";

export const Marks: React.FC<{
  data: Data[];
  yScale: ScaleLinear<number, number, never>;
  xScale: ScaleBand<string>;
  yValue: (d: Data) => number;
  xValue: (d: Data) => string;
  innerHeight?: number;
}> = ({ data, xScale, yScale, xValue, yValue, innerHeight = 0 }) => {
  return (
    <>
      {data.map((d) => (
        <rect
          className="mark"
          key={xValue(d)}
          x={xScale(xValue(d))}
          y={yScale(yValue(d))}
          width={xScale.bandwidth()}
          height={innerHeight - yScale(yValue(d))}
        >
          <title>{yValue(d)}</title>
        </rect>
      ))}
    </>
  );
};
