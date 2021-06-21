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

  const yValue = (d: Data) => d.count;
  const xValue = (d: Data) => d.val;

  const xScale = scaleBand()
    .domain(data.map(xValue))
    .range([0, innerWidth])
    .paddingInner(0.15);

  const yScale = scaleLinear()
    .domain([0, max(data, yValue) || 10])
    .range([innerHeight, 0]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft
          yScale={yScale}
          innerWidth={innerWidth}
          tickFormat={format("d")}
        />
        <text
          className="axis-label"
          x={-yAxisLabelOffset}
          y={innerHeight / 2}
          style={{ textAnchor: "middle" }}
        >
          Count
        </text>
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          style={{ textAnchor: "middle" }}
        >
          Date
        </text>
        <Marks
          data={data}
          innerHeight={innerHeight}
          yScale={yScale}
          xScale={xScale}
          yValue={yValue}
          xValue={xValue}
        />
      </g>
    </svg>
  );
};

export default App;
