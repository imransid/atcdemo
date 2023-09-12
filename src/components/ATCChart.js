import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import io from "socket.io-client";
import { PiArrowFatLeftDuotone, PiArrowFatRightDuotone } from "react-icons/pi";

const SOCKET_SERVER_URL = "ws://172.30.22.236:3000";
const socket = io.connect(SOCKET_SERVER_URL);

export default function ATCChart({
  data,
  width = window.innerWidth,
  height = 400,
  marginTop = 10,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 60,
  accessControlStatus,
}) {
  const gx = useRef();

  const curve1 = [
    [marginLeft + 200, height - 140],
    [marginLeft + 900, height - 170],
    [width - marginRight, marginTop +100],
  ];
  const curve2 = [
    [marginLeft, height - 220],
    [marginLeft + 900, height - 220],
    [width - marginRight, marginTop+100],
  ];
  const curve3 = [
    [marginLeft + 200, height - 250],
    [marginLeft + 900, height - 270],
    [width - marginRight, marginTop+100],
  ];

  const x = d3
    .scaleLinear()
    .domain([0, 1000])
    .range([marginLeft, width - marginRight]);
  //const y = d3.scaleLinear().domain([0,d3.max(data, function(d){ return d.y})]).range([ (height - marginBottom), marginTop]);
  const y = d3
    .scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

  const line = d3.line().curve(d3.curveNatural);

  const [pointerPosition, setPointerPosition] = useState({
    x: marginLeft,
    y: y(height - 339),
  });
  const [keyStatus, setKeyStatus] = useState("");

  const sendRhythmEvent = async (data) => {
    const emitPayload = {
      senderName: "Neaz",
      targetUserName: "ATC",
      flightInfo: {
        flightName: "Flight123",
        top: data.x,
        left: data.y,
        right: 75.0,
        down: 10.0,
        speed: keyStatus === "" ? -1 : keyStatus === "left" ? 0 : 1,
      },
    };

    socket.emit("ATC", emitPayload, async (status) => {
      console.log("Message sent : " + status);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPointerPosition((prevMarker) => {
        const newX1 = prevMarker.x > (width - marginRight) ? 0 : prevMarker.x + 10 ;
        console.log('x(0)',x(0))
        console.log('x(10)',x(10))
        console.log('x(1000)',x(1000))

        let return_data = { y: prevMarker.y, x: newX1 };
        sendRhythmEvent(return_data);
        return return_data;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [setPointerPosition, sendRhythmEvent]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (accessControlStatus) {
        const step = 1; // Adjust the step size as needed
        let updatedPosition = {};

        if (accessControlStatus) {
          //   updatedPosition = { ...marker1stItem };
          updatedPosition = { ...pointerPosition };
          switch (event.key) {
            case "ArrowLeft":
              updatedPosition.y = updatedPosition.y - step;
              setKeyStatus("left");
              break;
            case "ArrowRight":
              updatedPosition.y = updatedPosition.y + step;
              setKeyStatus("right");
              break;
            default:
              return;
          }
        }

        setPointerPosition(updatedPosition);
        sendRhythmEvent(updatedPosition);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    accessControlStatus,
    setPointerPosition,
    pointerPosition,
    sendRhythmEvent,
    setKeyStatus,
  ]);

  const colorChecker = (val) => {
    return val < 200 ? "green" : "red";
  };

  useEffect(
    () => void d3.select(gx.current).call(d3.axisBottom(x).tickSize(0)),
    [gx, x]
  );

  const GetKeyIcon = () => {
    if (keyStatus == "") return <></>;

    return keyStatus === "left" ? (
      <PiArrowFatLeftDuotone size={26} color="gray" />
    ) : (
      <PiArrowFatRightDuotone size={26} color="gray" />
    );
  };

  return (
    <div style={{ background: "black" }}>
      <svg width={width} height={height} id="my-svg">
        {/* <g
          ref={gx}
          color="grey"
          transform={`translate(0,${height - marginBottom})`}
        /> */}
        <g transform={`translate(${marginLeft},0)`} />
        <g fill="white" stroke="currentColor" strokeWidth="1.5">
          <line color='grey'  x1={marginLeft} y1={marginTop} x2={width - marginRight} y2={marginTop}/>
          <line
            color="grey"
            x1={marginLeft}
            y1={marginTop}
            x2={marginLeft}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(25)}
            y1={marginTop}
            x2={x(25)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(50)}
            y1={marginTop}
            x2={x(50)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(75)}
            y1={marginTop}
            x2={x(75)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            x1={x(100)}
            y1={marginTop}
            x2={x(100)}
            y2={height - marginBottom}
          />

          <line
            color="grey"
            opacity="0.4"
            x1={x(125)}
            y1={marginTop}
            x2={x(125)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(150)}
            y1={marginTop}
            x2={x(150)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(175)}
            y1={marginTop}
            x2={x(175)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            x1={x(200)}
            y1={marginTop}
            x2={x(200)}
            y2={height - marginBottom}
          />

          <line
            color="grey"
            opacity="0.4"
            x1={x(225)}
            y1={marginTop}
            x2={x(225)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(250)}
            y1={marginTop}
            x2={x(250)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(275)}
            y1={marginTop}
            x2={x(275)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            x1={x(300)}
            y1={marginTop}
            x2={x(300)}
            y2={height - marginBottom}
          />

          <line
            color="grey"
            opacity="0.4"
            x1={x(400)}
            y1={marginTop}
            x2={x(400)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(500)}
            y1={marginTop}
            x2={x(500)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(600)}
            y1={marginTop}
            x2={x(600)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(700)}
            y1={marginTop}
            x2={x(700)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(800)}
            y1={marginTop}
            x2={x(800)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(900)}
            y1={marginTop}
            x2={x(900)}
            y2={height - marginBottom}
          />
          <line
            color="grey"
            opacity="0.4"
            x1={x(1000)}
            y1={marginTop}
            x2={x(1000)}
            y2={height - marginBottom}
          />
        </g>
        <path
          fill="none"
          color="grey"
          stroke="currentColor"
          strokeWidth="1.5"
          d={line(curve1)}
        />
        <path
          fill="none"
          color="grey"
          stroke="currentColor"
          strokeWidth="1.5"
          d={line(curve2)}
        />
{/* 
        <text
          x={width - marginRight - 80} // Adjust the X-coordinate to align with the top-right corner
          y={marginTop + 10} // Adjust the Y-coordinate to align with the top margin
          fill={colorChecker(pointerPosition.y)} //"white" // Text color
          fontSize="16" // Font size
          fontWeight="bold" // Font weight
        >
          {pointerPosition.x}-{pointerPosition.y}
        </text> */}

        <GetKeyIcon />

        <path
          fill="none"
          color="grey"
          stroke="currentColor"
          strokeWidth="1.5"
          d={line(curve3)}
        />

<defs>
            <filter x="0" y="0" width="1" height="1" id="solid">
              <feFlood floodColor="white" result="bg" />
              <feMerge>
                <feMergeNode in="bg"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
        </defs>

<text x={pointerPosition.x} y={pointerPosition.y - 30} 
        //style={{background: 'white'}}
        //fill="white"
        filter="url(#solid)"
          textAnchor="middle"
          stroke="black"
          strokeWidth="1px"
          alignmentBaseline="middle"
          > {pointerPosition.y < y(height - 300) ? pointerPosition.y : - pointerPosition.y} / {
              parseFloat(
                Math.atan2(Math.abs(pointerPosition.y - (height - 220)), Math.abs(pointerPosition.x - (marginLeft + 900))) * 180/ Math.PI
                ).toFixed(2)
          }
          </text>

        <circle
          cx={pointerPosition.x}
          cy={pointerPosition.y}
          r={10} // Adjust the radius of the pointer
          fill="green" // Change the fill color to your liking
        />
      </svg>
    </div>
  );
}
