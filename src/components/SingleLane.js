import React, { useState } from "react";
import "../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  LineSeries,
  HorizontalGridLines,
  XAxis,
  YAxis,
  CustomSVGSeries,
} from "react-vis";

const App = ({
  redValue,
  greenValue,
  pinkValue,
  markerValue,
  fakeX,
  fakeY,
}) => {
  const [pointerPosition, setPointerPosition] = useState({
    x: 0,
    y: 1.8,
  }); // Initial position

  React.useEffect(() => {
    let data = {
      x: markerValue[0].x,
      y: 1.8,
    };
    setPointerPosition(data);
  }, [markerValue, setPointerPosition]);

  console.log("pointerPosition", pointerPosition);

  const CustomText = ({ x, y, text, backgroundColor, borderColor }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        {/* Background */}
        <rect
          x={-45} // Adjust the x-coordinate of the background
          y={-15} // Adjust the y-coordinate of the background
          width={80 + 10} // Adjust the width of the background
          height={30 + 10} // Adjust the height of the background
          fill={backgroundColor}
          stroke={borderColor}
          strokeWidth={1}
          rx={5} // Adjust the border radius of the background (optional)
        />

        {/* Text */}
        <text
          x="0"
          y="0"
          textAnchor="middle"
          alignmentBaseline="middle"
          style={{ fontSize: "12px", fill: "black" }}
        >
          {text}
        </text>
      </g>
    );
  };

  return (
    <div className="App">
      <XYPlot height={200} width={window.innerWidth}>
        <HorizontalGridLines />
        <XAxis />
        <LineSeries data={fakeX} color="white" />

        <CustomSVGSeries
          customComponent={(row, positionInPixels) => (
            <CustomText
              x={positionInPixels.x}
              y={positionInPixels.y}
              text="Centered Text"
              backgroundColor="lightblue" // Set the desired background color
              borderColor="blue" // Set the desired border color
            />
          )}
          data={[pointerPosition]}
        />
        <LineSeries data={fakeY} color="white" />
        <YAxis />
      </XYPlot>
    </div>
  );
};

export default App;
