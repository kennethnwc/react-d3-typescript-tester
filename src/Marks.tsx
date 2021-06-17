import { ScaleLinear } from "d3";
import { Data } from "./App";

export const Marks: React.FC<{
  data: Data[];
  xScale: ScaleLinear<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
  xValue: (d: Data) => number;
  yValue: (d: Data) => number;
  circleRadius?: number;
}> = ({ data, xScale, yScale, xValue, yValue, circleRadius = 10 }) => {
  return (
    <>
      {data.map((d, i) => (
        <circle
          key={`${d.species}_${i}`}
          className="mark"
          cx={xScale(xValue(d))}
          cy={yScale(yValue(d))}
          r={circleRadius}
        >
          <title>{xValue(d)}</title>
        </circle>
      ))}
    </>
  );
};
