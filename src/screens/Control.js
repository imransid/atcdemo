

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import RhythmChart from "../components/RhythmChart";
import ATCChart from "../components/ATCChart";

const SOCKET_SERVER_URL = "ws://172.30.22.236:3000";;
const socket = io(SOCKET_SERVER_URL);

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] = useState([]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update window width when the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [marker1stItem, setMarker1stItem] = useState([]);

  const [marker2ndItem, setMarker2ndItem] = useState([]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* <LinePlot data={marker1stItem} data2={marker2ndItem} /> */}

      <RhythmChart data={marker1stItem} accessControlStatus={true} />

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
