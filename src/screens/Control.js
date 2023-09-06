// import React, { useEffect, useState } from "react";
// import LineBox from "../components/LineChart";
// import SingleLine from "../components/SingleLane";
// import io from "socket.io-client";
// import {
//   redLine1stPanel,
//   redLine2ndPanel,
//   green1stPanel,
//   green2ndPanel,
//   pinkValue1stPanel,
//   pinkValue2ndPanel,
//   fakeLineXX,
//   fakeLineYY,
//   fakeXX,
//   fakeYY,
// } from "./Data";
// const SOCKET_SERVER_URL = "http://103.147.182.59:8878";
// const socket = io.connect(SOCKET_SERVER_URL);

// const App = () => {
//   // const [marker1stItem, setMarker1stItem] = useState([{ x: 0, y: 200 }]);
//   const [marker1stItem, setMarker1stItem] = useState([{ x: 0, y: 100 }]);
//   const [marker2ndItem, setMarker2ndItem] = useState([{ x: 0, y: 100 }]);
//   const [pointerPosition, setPointerPosition] = useState({ x: 10, y: 10 }); // Initial position
//   const [moveStatusLeftRight, setMoveStatusLeftRight] = useState(false); // Initial position
//   const [moveStatusAtcUPDown, setMoveStatusAtcUpDown] = useState(false); // Initial position

//   const sendRhythmEvent = async (upDownStatus, data) => {
//     const emitPayload = {
//       senderName: "Neaz",
//       targetUserName: upDownStatus ? "Rhythm" : "ATC",
//       flightInfo: {
//         flightName: "Flight123",
//         top: data.x,
//         left: data.y,
//         right: 75.0,
//         down: 10.0,
//         speed: 10,
//       },
//     };
//     socket.emit("messageSendToUser", emitPayload, async (status) => {
//       console.log("Message sent : " + status);
//     });
//   };

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (moveStatusAtcUPDown === true || moveStatusLeftRight === true) {
//         const step = 100; // Adjust the step size as needed
//         let updatedPosition = {};
//         if (moveStatusLeftRight) {
//           updatedPosition = { ...marker2ndItem };
//           switch (event.key) {
//             case "ArrowLeft":
//               updatedPosition[0].y += step;
//               break;
//             case "ArrowRight":
//               updatedPosition[0].y -= step;
//               break;
//             default:
//               return;
//           }
//         }

//         if (moveStatusAtcUPDown) {
//           updatedPosition = { ...marker1stItem };
//           switch (event.key) {
//             case "ArrowUp":
//               updatedPosition[0].y += step;
//               break;
//             case "ArrowDown":
//               updatedPosition[0].y -= step;
//               break;
//             default:
//               return;
//           }
//         }

//         // Update the pointer position within bounds if needed
//         updatedPosition[0].y = Math.min(
//           Math.max(updatedPosition[0].y, 10),
//           1000
//         ); // Adjust the bound

//         if (moveStatusAtcUPDown) {
//           setMarker1stItem([updatedPosition[0]]);
//         }

//         if (moveStatusLeftRight) {
//           setMarker2ndItem([updatedPosition[0]]);
//         }

//         sendRhythmEvent(moveStatusAtcUPDown, updatedPosition[0]);
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [
//     moveStatusAtcUPDown,
//     moveStatusLeftRight,
//     socket,
//     marker1stItem,
//     marker2ndItem,
//   ]);

//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     // Function to update window width when the window is resized
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     // Add event listener for window resize
//     window.addEventListener("resize", handleResize);

//     // Clean up the event listener when the component is unmounted
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMarker1stItem((prevMarker) => {
//         const newX1 = prevMarker[0].x >= 1000 ? 0 : prevMarker[0].x + 10;

//         let val = [{ ...prevMarker[0], x: newX1 }];

//         sendRhythmEvent(true, val[0]);

//         console.log("val", val);

//         return [{ ...prevMarker[0], x: newX1 }];
//       });
//       setMarker2ndItem((prevMarker) => {
//         const newX2 = prevMarker[0].x >= 1000 ? 0 : prevMarker[0].x + 10;
//         let val = [{ ...prevMarker[0], x: newX2 }];

//         sendRhythmEvent(false, val[0]);
//         return [{ ...prevMarker[0], x: newX2 }];
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [moveStatusAtcUPDown]);

//   return (
//     <div style={{ height: "100%", width: "100%" }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: 150,
//           width: "100%",
//           flexDirection: "column",
//         }}
//       >
//         {!moveStatusAtcUPDown ? (
//           <button
//             onClick={() => {
//               setMoveStatusLeftRight(false);
//               setMoveStatusAtcUpDown(true);
//             }}
//             style={{ padding: 10 }}
//           >
//             Press To Control Panel
//           </button>
//         ) : (
//           <>
//             <h2>To Change Position Press Keyboard UP Or DOWN arrow key</h2>

//             <button
//               onClick={() => setMoveStatusAtcUpDown(false)}
//               style={{ padding: 10, marginLeft: 20 }}
//             >
//               Cancel
//             </button>
//           </>
//         )}
//       </div>
//       <LineBox
//         redValue={redLine1stPanel}
//         greenValue={green1stPanel}
//         pinkValue={pinkValue1stPanel}
//         markerValue={marker1stItem}
//         fakeX={fakeXX}
//         fakeY={fakeYY}
//         windowWidth={windowWidth}
//         color={"white"}
//       />

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: 150,
//           width: "100%",
//           flexDirection: "column",
//         }}
//       >
//         {!moveStatusLeftRight ? (
//           <button
//             onClick={() => {
//               setMoveStatusAtcUpDown(false);
//               setMoveStatusLeftRight(true);
//             }}
//             style={{ padding: 10, marginLeft: 20 }}
//           >
//             Press To Control Panel
//           </button>
//         ) : (
//           <>
//             <h2>To Change Position Press Keyboard Left Or Right arrow key</h2>

//             <button
//               onClick={() => setMoveStatusLeftRight(false)}
//               style={{ padding: 10, marginLeft: 20 }}
//             >
//               Cancel
//             </button>
//           </>
//         )}
//       </div>

//       <LineBox
//         greenValue={green2ndPanel}
//         redValue={redLine2ndPanel}
//         pinkValue={pinkValue2ndPanel}
//         markerValue={marker2ndItem}
//         fakeX={fakeXX}
//         fakeY={fakeYY}
//         windowWidth={windowWidth}
//         color={"white"}
//       />
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import RhythmChart from "../components/RhythmChart";
import ATCChart from "../components/ATCChart";

const SOCKET_SERVER_URL = "http://103.147.182.59:8878";
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
