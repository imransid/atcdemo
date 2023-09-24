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

  const [pointerPosition, setPointerPosition] = useState({
    x: marginLeft,
    y: height - 140,
    airCraftSpeed: 200
  });

  const [timer, setTimer] = useState(2000);

  const y = d3
    .scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

  const [pointerPositionAtc, setPointerPositionAtc] = useState({
    x: marginLeft,
    y: y(height - 339),
    airCraftSpeed: 200
  });

  const x = d3
    .scaleLinear()
    .domain([0, 1000])
    .range([marginLeft, width - marginRight]);

    const sendRhythmEvent = async (data) => {
      const emitPayload = {
        senderName: "Rafa",
        targetUserName: "Rhythm",
        flightInfo: {
          flightName: "Flight123",
          top: data.x,
          left: data.y,
          right: 75.0,
          down: 10.0,
          airCraftSpeed: 200,
          //speed: keyStatus === "" ? -1 : keyStatus === "up" ? 2 : 3,
        },
      };
  
      socket.emit("Rhythm", emitPayload, async (status) => {
        console.log("Message sent : " + status);
      });
    };

    const sendATCEvent = async (data) => {
      const emitPayload = {
        senderName: "Neaz",
        targetUserName: "ATC",
        flightInfo: {
          flightName: "Flight123",
          top: data.x,
          left: data.y,
          right: 75.0,
          down: 10.0,
          speed: 200,
          airCraftSpeed: 200,
          //speed: keyStatus === "" ? -1 : keyStatus === "left" ? 0 : 1,
        },
      };
  
      socket.emit("ATC", emitPayload, async (status) => {
        console.log("Message sent : " + status);
      });
    };

  useEffect(() => {
    const interval = setInterval(() => {
      setPointerPosition((prevMarker) => {
        const newX1 =
          prevMarker.x > width - marginRight ? 0 : prevMarker.x + 10;
          prevMarker.x > x(300) ? setTimer(500): setTimer(2000)
        let return_data = { y: prevMarker.y, x: newX1, airCraftSpeed: 200 };
        let return_data_atc = { y: pointerPosition.y, x: newX1, airCraftSpeed: 200 };
        setPointerPositionAtc(return_data_atc);
        sendRhythmEvent(return_data);
        sendATCEvent(return_data_atc)
        return return_data;
      });

      // setPointerPositionAtc((prevMarker) => {
      //   const newX1 =
      //     prevMarker.x > width - marginRight ? 0 : prevMarker.x + 10;
      //     prevMarker.x > x(300) ? setTimer(500): setTimer(2000)
      //   let return_data = { y: prevMarker.y, x: newX1, airCraftSpeed: 200 };
      //   let return_data_par = { y: pointerPositionAtc.y, x: newX1, airCraftSpeed: 200 };
      //   setPointerPosition(return_data_par);
      //   sendRhythmEvent(return_data_par);
      //   sendATCEvent(return_data)
      //   return return_data;
      // });

    }, timer);
    return () => clearInterval(interval);
  }, [setPointerPosition, setPointerPositionAtc, pointerPositionAtc]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* <LinePlot data={marker1stItem} data2={marker2ndItem} /> */}

      <RhythmChart
        data={pointerPosition}
        accessControlStatus={true}
        updateState={(e) => setPointerPosition(e)}
      />

      <ATCChart
        data={pointerPositionAtc}
        accessControlStatus={true}
        updateState={(e) => setPointerPositionAtc(e)}
      />
    </div>
  );
};

export default App;
