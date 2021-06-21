import { extent, format, scaleLinear, scaleTime } from "d3";
import React from "react";
import "./App.css";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { useData } from "./useData";

export type Data = {
  date: Date;
  price: number;
};

const width = 960;
const height = 500;
const margin = { top: 20, bottom: 60, left: 200, right: 30 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 120;

const App = () => {
  const data = useData<Data[]>();
  console.log(data);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  if (!data) {
    return <div>Loading</div>;
  }

  const yValue = (d: Data) => d.price;
  const xValue = (d: Data) => d.date;

  const xRange: [Date, Date] = (extent(data, (d) => d.date) || [
    new Date(),
    new Date(),
  ]) as [Date, Date];

  const yRange = extent(data, (d) => d.price) as [number, number];

  const xScale = scaleTime().domain(xRange).range([0, innerWidth]);

  const yScale = scaleLinear().domain(yRange).range([innerHeight, 0]);

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
          Price
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
