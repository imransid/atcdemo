import React, { useEffect, useState } from "react";
import LineBox from "../components/LineChart";
import SingleLine from "../components/SingleLane";
import io from "socket.io-client";
import {
  redLine1stPanel,
  redLine2ndPanel,
  green1stPanel,
  green2ndPanel,
  pinkValue1stPanel,
  pinkValue2ndPanel,
  fakeLineXX,
  fakeLineYY,
  fakeXX,
  fakeYY,
} from "./Data";

const SOCKET_SERVER_URL = "http://103.147.182.59:8878";
const socket = io(SOCKET_SERVER_URL);

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      console.log(value);

      if (value && value.flightInfo) {
        const { top, left } = value.flightInfo;
        const newData = [{ x: top, y: left }];
        setMarker1stItem(newData);
      }
    }

    function onFooEventATC(value) {
      console.log(value);
      if (value && value.flightInfo) {
        const { top, left } = value.flightInfo;
        const newData = [{ x: top, y: left }];
        setMarker2ndItem(newData);
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("Rhythm", onFooEvent);
    socket.on("ATC", onFooEventATC);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  console.log("isConnected", isConnected, fooEvents);

  const [marker1stItem, setMarker1stItem] = useState([{ x: 200, y: 200 }]);
  const [marker2ndItem, setMarker2ndItem] = useState([{ x: 100, y: 800 }]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <LineBox
        redValue={redLine1stPanel}
        greenValue={green1stPanel}
        pinkValue={pinkValue1stPanel}
        markerValue={marker1stItem}
        fakeX={fakeXX}
        fakeY={fakeYY}
      />

      {/* <SingleLine
        markerValue={marker2ndItem}
        fakeX={fakeLineXX}
        fakeY={fakeLineYY}
      /> */}

      <LineBox
        greenValue={green2ndPanel}
        redValue={redLine2ndPanel}
        pinkValue={pinkValue2ndPanel}
        markerValue={marker2ndItem}
        fakeX={fakeXX}
        fakeY={fakeYY}
      />
    </div>
  );
};

export default App;
