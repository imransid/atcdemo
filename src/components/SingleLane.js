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
  const [modeIndex] = useState(1);

  const MODE = ["noWobble", "gentle", "wobbly", "stiff"];

  const myData = [
    { x: 1.7, y: 1, size: 50, style: { stroke: "red", fill: "orange" } },
  ];

  const [pointerPosition, setPointerPosition] = useState({ x: 1, y: 1.8 }); // Initial position

  React.useEffect(() => {
    const interval = setInterval(() => {
      // Update the x-coordinate of the pointer position
      setPointerPosition((prevPosition) => {
        const maxX = 10; // Adjust the maximum x-coordinate as needed
        const step = 0.1; // Adjust the step size as needed
        const newX = prevPosition.x + step;
        return { ...prevPosition, x: newX > maxX ? 0 : newX };
      });
    }, 1000); // Interval in milliseconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  // React.useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     const step = 0.1; // Adjust the step size as needed
  //     let updatedPosition = { ...pointerPosition };

  //     switch (event.key) {
  //       case "ArrowLeft":
  //         updatedPosition.x -= step;
  //         break;
  //       case "ArrowRight":
  //         updatedPosition.x += step;
  //         break;
  //       case "ArrowUp":
  //         updatedPosition.y += step;
  //         break;
  //       case "ArrowDown":
  //         updatedPosition.y -= step;
  //         break;
  //       default:
  //         return;
  //     }

  //     // Update the pointer position within bounds if needed
  //     updatedPosition.x = Math.min(Math.max(updatedPosition.x, 0), 10); // Adjust the bounds
  //     updatedPosition.y = Math.min(Math.max(updatedPosition.y, 0), 10); // Adjust the bounds

  //     setPointerPosition(updatedPosition);
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [pointerPosition]);

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
