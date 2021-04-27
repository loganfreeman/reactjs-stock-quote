import React from "react";
import {
	G2,
	Chart,
	Geom,
	Axis,
	Tooltip,
	Coord,
	Label,
	Legend,
	LineAdvance
} from "bizcharts";

export default function LineSeries({data}: {data: any[]}) {
  const cols = {
    month: {
      range: [0, 1]
    }
  };
  return (
    <Chart height={400} appendPadding={[10,0,0,0]} data={data} scale={cols} autoFit>
      <Legend />
      <Axis name="month" />
      <Axis name="value" />
      <Tooltip
        crosshairs={{
          type: "y"
        }}
      />
      <LineAdvance
        shape="smooth"
        point
        area
        position="month*value"
        color="key"
      />
    </Chart>
  );
}