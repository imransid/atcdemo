import React, { useEffect, useState } from "react";
import "../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  LineSeries,
  HorizontalGridLines,
  XAxis,
  YAxis,
  CustomSVGSeries,
  VerticalGridLines,
} from "react-vis";

const App = ({ markerValue, windowWidth, color }) => {
  const [myData, setMyData] = useState([
    {
      x: 100,
      y: 1,
      customComponent: (row, positionInPixels) => {
        return (
          <g className="inner-inner-component">
            <rect
              x={-25} // Adjust the x-coordinate of the background
              y={-25} // Adjust the y-coordinate of the background
              width={80} // Adjust the width of the background
              height={50} // Adjust the height of the background
              fill={"white"}
              stroke={"green"}
              strokeWidth={1}
              rx={10} // Adjust the border radius of the background (optional)
            />
            <text x={0} y={0}>
              {/* Adjusted x position */}
              <tspan x="0" y="0">{`X : ${myData[0].x}`}</tspan>
              {/* <tspan x="0" y="1em">{`Y : ${markerValue[0].y}`}</tspan> */}
            </text>
          </g>
        );
      },
      size: 50,
    },
    { x: 0, y: 0 },
    { x: 50, y: 2 },
    { x: 100, y: 2 },
    { x: 150, y: 2 },
    { x: 200, y: 2 },
    { x: 250, y: 2 },
    { x: 300, y: 2 },
    { x: 350, y: 2 },
    { x: 400, y: 2 },
    { x: 450, y: 2 },
    { x: 500, y: 2 },
    { x: 550, y: 2 },
    { x: 600, y: 2 },
    { x: 650, y: 2 },
    { x: 700, y: 2 },
    { x: 800, y: 2 },
    { x: 850, y: 2 },
    { x: 900, y: 2 },
    { x: 1000, y: 2 },
    { x: 1050, y: 2 },
    { x: 1100, y: 2 },
    { x: 1150, y: 2 },
    { x: 1200, y: 2 },
    { x: 1250, y: 2 },
    { x: 1300, y: 2 },
    { x: 1350, y: 2 },
    { x: 1400, y: 2 },
  ]);

  useEffect(() => {
    const dataIS = [...myData];
    dataIS[0].x = markerValue[0].x;
    setMyData(dataIS);
  }, [markerValue, setMyData]);

  return (
    <XYPlot width={windowWidth} height={300} style={{ backgroundColor: color }}>
      <HorizontalGridLines />
      <VerticalGridLines />
      <CustomSVGSeries customComponent="square" data={myData} />
    </XYPlot>
  );
};

export default App;
