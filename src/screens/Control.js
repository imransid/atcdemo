import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import RhythmChart from "../components/RhythmChart";
import ATCChart from "../components/ATCChart";
import * as d3 from "d3";

const SOCKET_SERVER_URL = "ws://172.30.22.236:3000";
const socket = io(SOCKET_SERVER_URL);

const App = ({
  width = window.innerWidth,
  height = 400,
  marginTop = 10,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 60,
}) => {
  const [marker1stItem, setMarker1stItem] = useState([]);

  const [pointerPosition, setPointerPosition] = useState({
    x: marginLeft,
    y: height - 140,
  });

  const x = d3
    .scaleLinear()
    .domain([0, 1000])
    .range([marginLeft, width - marginRight]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPointerPosition((prevMarker) => {
        const newX1 = prevMarker.x > x(697.5) ? 0 : prevMarker.x + 10;
        let return_data = { y: prevMarker.y, x: newX1 };
        return return_data;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [setPointerPosition]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* <LinePlot data={marker1stItem} data2={marker2ndItem} /> */}

      <RhythmChart
        data={pointerPosition}
        accessControlStatus={true}
        updateState={(e) => setPointerPosition(e)}
      />

      <ATCChart data={marker1stItem} accessControlStatus={true} />
      {/* <LineBox
        redValue={redLine1stPanel}
        greenValue={green1stPanel}
        pinkValue={pinkValue1stPanel}
        markerValue={marker1stItem}
        fakeX={fakeXX}
        fakeY={fakeYY}
        windowWidth={windowWidth}
        color={"black"}
      />

      <SingleLine
        markerValue={marker2ndItem}
        fakeX={fakeLineXX}
        fakeY={fakeLineYY}
        windowWidth={windowWidth}
        color={"black"}
      />

      <LineBox
        greenValue={green2ndPanel}
        redValue={redLine2ndPanel}
        pinkValue={pinkValue2ndPanel}
        markerValue={marker2ndItem}
        fakeX={fakeXX}
        fakeY={fakeYY}
        windowWidth={windowWidth}
        color={"black"}
      /> */}
    </div>
  );
};

export default App;
