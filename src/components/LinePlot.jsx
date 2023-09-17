import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import SingleLinePlot from "./SingleLinePlot";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "ws://172.30.22.236:3000";
const socket = io(SOCKET_SERVER_URL);

export default function LinePlot({
  width = window.innerWidth,
  height = 400,
  marginTop = 10,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 60,
}) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [marker1stItem, setMarker1stItem] = useState([]);
  const [marker2ndItem, setMarker2ndItem] = useState([]);
  const [iconStatusRhythm, setIconStatusRhythm] = useState(-1);
  const [iconStatusAtc, setIconStatusAtc] = useState(-1);

  useEffect(() => {
    function onConnect() {
      console.log('call')
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    let marker1Item = marker1stItem;
    function onRhythmEventConnect(value) {
      console.log(value);
      if (value && value.flightInfo) {
        const { top, left, speed, airCraftSpeed } = value.flightInfo;
        const newData = { x: top, y: left , airCraftSpeed};

        setIconStatusRhythm(speed);

        if (top === 0) {
          marker1Item = [];
        } else {
          marker1Item.push(newData);
        }
        setMarker1stItem([...marker1Item]);
      }
    }

    let marker2Item = marker2ndItem;
    function onAtcEventConnect(value) {
      if (value && value?.flightInfo) {
        const { top, left, speed , airCraftSpeed} = value.flightInfo;
        const newData = { x: top, y: left, airCraftSpeed };
        setIconStatusAtc(speed);
        if (top === 0) {
          marker2Item = [];
        } else {
          marker2Item.push(newData);
        }
        setMarker2ndItem([...marker2Item]);
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("Rhythm", onRhythmEventConnect);
    socket.on("ATC", onAtcEventConnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("Rhythm", onRhythmEventConnect);
      socket.off("ATC", onAtcEventConnect);
    };
  }, []);

  return (
    <div style={{ background: "black" }}>
      <SingleLinePlot
        data={marker1stItem}
        data2={[]}
        width={width}
        height={height}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        marginTop={marginTop}
        status={"Rhythm"}
        iconStatus={iconStatusRhythm}
      />

      <SingleLinePlot
        data={[]}
        data2={marker2ndItem}
        width={width}
        height={height}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        marginTop={marginTop}
        status={"ATC"}
        iconStatus={iconStatusAtc}
      />
    </div>
  );
}
