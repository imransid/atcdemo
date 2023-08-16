import React, { useState } from "react";
import "../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  LineSeries,
  HorizontalGridLines,
  XAxis,
  YAxis,
  VerticalGridLines,
  MarkSeries,
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

  // Define your custom square marker component
  const CustomMarker = ({ x, y }) => (
    <div style={{ height: 30, width: 40, backgroundColor: "green" }}></div>
  );

  return (
    <div className="App">
      <XYPlot height={300} width={window.innerWidth}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <LineSeries data={fakeX} color="white" />
        <LineSeries data={greenValue} color="green" />
        <LineSeries data={redValue} color="red" />
        <LineSeries data={pinkValue} color="blue" />
        {/* Pass the custom square marker component */}
        <MarkSeries
          animation={MODE[modeIndex]}
          data={markerValue}
          style={{ height: 50, width: 50, backgroundColor: "green" }}
        />
        <LineSeries data={fakeY} color="white" />
        <YAxis />
      </XYPlot>
    </div>
  );
};

export default App;
