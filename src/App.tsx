import { scaleBand, scaleLinear, max, format } from "d3";
import React from "react";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { useData } from "./useData";
import "./App.css";

export type Data = {
  val: string;
  count: number;
};

const width = 960;
const height = 500;
const margin = { top: 20, bottom: 60, left: 200, right: 30 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 120;

const App = () => {
  const data = useData<Data[]>();

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  if (!data) {
    return <div>Loading</div>;
  }

  const yValue = (d: Data) => d.val;
  const xValue = (d: Data) => d.count;

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.15);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue) || 10])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          innerHeight={innerHeight}
          xScale={xScale}
          tickFormat={format("d")}
        />
        <AxisLeft yScale={yScale} />
        <text
          className="axis-label"
          x={-yAxisLabelOffset}
          y={innerHeight / 2}
          style={{ textAnchor: "middle" }}
        >
          Date
        </text>
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          style={{ textAnchor: "middle" }}
        >
          Count
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  );
};

export default App;
