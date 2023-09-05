import React, {useRef, useEffect, useState} from 'react'
import * as d3 from "d3";
import io from "socket.io-client";
import { PiArrowFatUpDuotone, PiArrowFatDownDuotone } from 'react-icons/pi';



const SOCKET_SERVER_URL = "http://103.147.182.59:8878";
const socket = io.connect(SOCKET_SERVER_URL);

export default function RhythmChart({
    data,
    width = window.innerWidth,
    height = 400,
    marginTop = 10,
    marginRight = 30,
    marginBottom = 30,
    marginLeft = 60,
    accessControlStatus
  }) {

    const gx = useRef();

    const curve1 = [[marginLeft+200, height-300],[marginLeft+900, height-270],[width-marginRight, height - marginBottom]];
    const curve2 = [[marginLeft, height-250],[marginLeft+900, height-220],[width-marginRight, height - marginBottom]];
    const curve3 = [[marginLeft+200, height-200],[marginLeft+900, height-170],[width-marginRight, height - marginBottom]];

    const x = d3.scaleLinear().domain([0, 1000]).range([ marginLeft, (width - marginRight) ]);
    //const y = d3.scaleLinear().domain([0,d3.max(data, function(d){ return d.y})]).range([ (height - marginBottom), marginTop]);
    const y = d3.scaleLinear().domain([0,100]).range([ (height - marginBottom), marginTop]);


    const line = d3.line().curve(d3.curveNatural);
                        
    const [pointerPosition, setPointerPosition] = useState({ x: marginLeft, y: y(height - 339)});
    const [keyStatus, setKeyStatus] = useState("");

    const sendRhythmEvent = async ( data) => {
        const emitPayload = {
          senderName: "Neaz",
          targetUserName:  "Rhythm",
          flightInfo: {
            flightName: "Flight123",
            top: data.x,
            left: data.y,
            right: 75.0,
            down: 10.0,
            speed: 10,
            keyStatus: keyStatus
          },
        };

        socket.emit("messageSendToUser", emitPayload, async (status) => {
          console.log("Message sent : " + status);
        });
      };



    useEffect(() => {
    const interval = setInterval(() => {
        setPointerPosition((prevMarker) => {
        const newX1 = prevMarker.x > x(697.5) ? 0 : prevMarker.x + 10;

        let return_data = { y: prevMarker.y , x: newX1};
        sendRhythmEvent(return_data);
        return return_data;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [ setPointerPosition, sendRhythmEvent]);



  useEffect(() => {
    const handleKeyDown = (event) => {
      if (accessControlStatus) {
        const step = 1; // Adjust the step size as needed
        let updatedPosition = {};

        if (accessControlStatus) {
        //   updatedPosition = { ...marker1stItem };
        updatedPosition = { ...pointerPosition };
          switch (event.key) {
            case "ArrowUp":
              updatedPosition.y =  updatedPosition.y - step;
              setKeyStatus("up")
              break;
            case "ArrowDown":
              updatedPosition.y =  updatedPosition.y + step;
              setKeyStatus("down")
              break;
            default:
              return;
          }
        }

        setPointerPosition(updatedPosition);
        sendRhythmEvent(updatedPosition)
    
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
    setKeyStatus
  ]);


  const colorChecker = (val) => {

    return val < 200 ? 'green' : 'red'

  } 

  useEffect(() => void 
  d3.select(gx.current).call(d3.axisBottom(x).tickSize(0)),[gx, x]
);


const GetKeyIcon = () => {

      if(keyStatus == '') return <></>

    return keyStatus === 'up' ?  <PiArrowFatUpDuotone size={26} color='gray' /> : <PiArrowFatDownDuotone size={26} color='gray' /> 
}


    return (
      <div style={{ background: 'black'}}>
     
      <svg width={width} height={height} id='my-svg'>
            <g ref={gx} color='grey'  transform={`translate(0,${height - marginBottom})`}/>
            <g  transform={`translate(${marginLeft},0)`} />
            <g fill="white" stroke="currentColor" strokeWidth="1.5">

              <line color='grey'  x1={marginLeft} y1={marginTop} x2={marginLeft} y2={height - marginBottom}/>
              <line color='grey' opacity='0.4' x1={x(25)} y1={marginTop} x2={x(25)} y2={height - marginBottom}/>
              <line color='grey' opacity='0.4' x1={x(50)} y1={marginTop} x2={x(50)} y2={height - marginBottom}/>
              <line color='grey' opacity='0.4' x1={x(75)} y1={marginTop} x2={x(75)} y2={height - marginBottom}/>
              <line color='grey' x1={x(100)} y1={marginTop} x2={x(100)} y2={height - marginBottom}/>

              <line color='grey' opacity='0.4' x1={x(125)} y1={marginTop} x2={x(125)} y2={height - marginBottom}/>
              <line color='grey' opacity='0.4' x1={x(150)} y1={marginTop} x2={x(150)} y2={height - marginBottom}/>
              <line color='grey' opacity='0.4' x1={x(175)} y1={marginTop} x2={x(175)} y2={height - marginBottom}/>
              <line color='grey'  x1={x(200)} y1={marginTop} x2={x(200)} y2={height - marginBottom}/>

              <line color='grey' opacity='0.4' x1={x(225)} y1={marginTop} x2={x(225)} y2={height - marginBottom}/>
              <line color='grey' opacity='0.4' x1={x(250)} y1={marginTop} x2={x(250)} y2={height - marginBottom}/>
              <line color='grey' opacity='0.4' x1={x(275)} y1={marginTop} x2={x(275)} y2={height - marginBottom}/>
              <line color='grey' x1={x(300)} y1={marginTop} x2={x(300)} y2={height - marginBottom}/>

              <line color='grey' opacity='0.4' x1={x(400)} y1={marginTop} x2={x(400)} y2={height - marginBottom}/>
              <line color='grey' opacity='0.4' x1={x(500)} y1={marginTop} x2={x(500)} y2={height - marginBottom}/>
              <line color='grey' opacity='0.4' x1={x(600)} y1={marginTop} x2={x(600)} y2={height - marginBottom}/>
              <line color='grey' opacity='0.4' x1={x(700)} y1={marginTop} x2={x(700)} y2={height - marginBottom}/>
              <line color='grey' opacity='0.4' x1={x(800)} y1={marginTop} x2={x(800)} y2={height - marginBottom}/>
              <line color='grey' opacity='0.4' x1={x(900)} y1={marginTop} x2={x(900)} y2={height - marginBottom}/>
              <line color='grey' opacity='0.4' x1={x(1000)} y1={marginTop} x2={x(1000)} y2={height - marginBottom}/>
            </g> 
            <path
              fill="none"
              color='grey' 
              stroke="currentColor"
              strokeWidth="1.5"
              d={line(curve1)}
            />
            <path
              fill="none"
              color='grey' 
              stroke="currentColor"
              strokeWidth="1.5"
              d={line(curve2)}
            />

            <text
            x={(width - marginRight)- 80} // Adjust the X-coordinate to align with the top-right corner
            y={marginTop + 10 } // Adjust the Y-coordinate to align with the top margin
            fill= {colorChecker(pointerPosition.y)}//"white" // Text color
            fontSize="16" // Font size
            fontWeight="bold" // Font weight
            >
           {
            pointerPosition.x 
           }
            - 
           {
            pointerPosition.y
           }
            </text>


         <GetKeyIcon />

            <path
              fill="none"
              color='grey' 
              stroke="currentColor"
              strokeWidth="1.5"
              d={line(curve3)}
            />

                <circle
                cx={pointerPosition.x}
                cy={pointerPosition.y}
                r={10} // Adjust the radius of the pointer
                fill='red' // Change the fill color to your liking
              />

      </svg>

      </div>

      
    );
}
