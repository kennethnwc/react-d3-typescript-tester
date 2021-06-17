import { ScaleLinear, ScaleBand } from "d3";
import { Data } from "./App";

export const Marks: React.FC<{
  data: Data[];
  xScale: ScaleLinear<number, number, never>;
  yScale: ScaleBand<string>;
  xValue: (d: Data) => number;
  yValue: (d: Data) => string;
}> = ({ data, xScale, yScale, xValue, yValue }) => {
  return (
    <>
      {data.map((d) => (
        <rect
          className="mark"
          key={yValue(d)}
          x={0}
          y={yScale(yValue(d))}
          width={xScale(xValue(d))}
          height={yScale.bandwidth()}
        >
          <title>{xValue(d)}</title>
        </rect>
      ))}
    </>
  );
};
