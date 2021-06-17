import { extent, format, scaleLinear } from "d3";
import React from "react";
import "./App.css";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { useData } from "./useData";

export type Data = {
  sepal_length: number;
  sepal_width: number;
  petal_length: number;
  petal_width: number;
  species: string;
};

const width = 960;
const height = 500;
const margin = { top: 20, bottom: 30, left: 100, right: 30 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

const App = () => {
  const data = useData<Data[]>();

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  if (!data) {
    return <div>Loading</div>;
  }

  const xValue = (d: Data) => d.sepal_length;
  const xAxisLabel = "Sepal Length";

  const yValue = (d: Data) => d.sepal_width;
  const yAxisLabel = "Sepal Width";

  const xScale = scaleLinear()
    .domain(extent(data, xValue) as [number, number])
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue) as [number, number])
    .range([0, innerHeight]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          tickOffset={10}
          innerHeight={innerHeight}
          xScale={xScale}
          tickFormat={format(".2f")}
        />
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <text
          className="axis-label"
          style={{ textAnchor: "middle" }}
          transform={`translate(${-yAxisLabelOffset}, ${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          style={{ textAnchor: "middle" }}
        >
          {xAxisLabel}
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          circleRadius={7}
        />
      </g>
    </svg>
  );
};

export default App;
