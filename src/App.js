// import React, { useEffect, useState } from "react";
// import LineBox from "./LineChart";
// import SingleLine from "./SingleLane";
// import io from "socket.io-client";

// const SOCKET_SERVER_URL = "http://103.147.182.59:8878";
// const socket = io(SOCKET_SERVER_URL);

// const App = () => {
//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("go"); // true
//     });

//     return () => {
//       socket.off("connect", () => {
//         console.log("dismissed"); // true
//       });
//     };
//   }, []);
//   // useEffect(() => {
//   //   // Event listeners
//   //   socket.on("connect", () => {
//   //     console.log("Connected to the socket server");
//   //   });

//   //   socket.on("message", (data) => {
//   //     console.log("Received message:", data);
//   //   });

//   //   socket.on("disconnect", () => {
//   //     console.log("Disconnected from the socket server");
//   //   });

//   //   // Clean up the socket connection when component unmounts
//   //   return () => {
//   //     socket.disconnect();
//   //   };
//   // }, []);

//   const green1stPanel = [
//     { x: 0, y: 200 },
//     { x: 100, y: 300 },
//     { x: 200, y: 400 },
//     { x: 300, y: 500 },
//     { x: 400, y: 600 },
//     { x: 500, y: 700 },
//     { x: 600, y: 800 },
//     { x: 700, y: 900 },
//     { x: 800, y: 1000 },
//     { x: 900, y: 1050 },
//     { x: 1000, y: 1000 },
//     { x: 1100, y: 900 },
//     { x: 1200, y: 800 },
//     { x: 1300, y: 700 },
//     { x: 1400, y: 600 },
//   ];
//   const green2ndPanel = [
//     { x: 0, y: 8 },
//     { x: 1, y: 8 },
//     { x: 2, y: 8 },
//     { x: 3, y: 8 },
//     { x: 4, y: 8 },
//     { x: 5, y: 8 },
//     { x: 6, y: 8 },
//     { x: 7, y: 8 },
//     { x: 8, y: 8 },
//     { x: 9, y: 8 },
//     { x: 10, y: 8 },
//     { x: 11, y: 8 },
//     { x: 12, y: 8 },
//     { x: 13, y: 8 },
//     { x: 14, y: 8 },
//   ];

//   const redLine1stPanel = [
//     { x: 0, y: 600 },
//     { x: 100, y: 500 },
//     { x: 200, y: 600 },
//     { x: 300, y: 700 },
//     { x: 400, y: 800 },
//     { x: 500, y: 900 },
//     { x: 600, y: 1000 },
//     { x: 700, y: 1100 },
//     { x: 800, y: 1200 },
//     { x: 900, y: 1250 },
//     { x: 1000, y: 1200 },
//     { x: 1100, y: 1100 },
//     { x: 1200, y: 1000 },
//     { x: 1300, y: 900 },
//     { x: 1400, y: 800 },
//   ];

//   const redLine2ndPanel = [
//     { x: 0, y: 5 },
//     { x: 1, y: 5 },
//     { x: 2, y: 5 },
//     { x: 3, y: 5 },
//     { x: 4, y: 5 },
//     { x: 5, y: 5 },
//     { x: 6, y: 5 },
//     { x: 7, y: 5 },
//     { x: 8, y: 5 },
//     { x: 9, y: 5 },
//     { x: 10, y: 5 },
//     { x: 11, y: 5 },
//     { x: 12, y: 5 },
//     { x: 13, y: 5 },
//     { x: 14, y: 5 },
//   ];

//   const pinkValue1stPanel = [
//     { x: 0, y: 0 },
//     { x: 1, y: 1 },
//     { x: 2, y: 2 },
//     { x: 3, y: 3 },
//     { x: 4, y: 4 },
//     { x: 5, y: 5 },
//     { x: 6, y: 6 },
//     { x: 7, y: 7 },
//     { x: 8, y: 8 },
//     { x: 9, y: 8.5 },
//     { x: 10, y: 8 },
//     { x: 11, y: 7 },
//     { x: 12, y: 6 },
//     { x: 13, y: 5 },
//     { x: 14, y: 4 },
//   ];

//   const pinkValue2ndPanel = [
//     { x: 0, y: 11 },
//     { x: 1, y: 11 },
//     { x: 2, y: 11 },
//     { x: 3, y: 11 },
//     { x: 4, y: 11 },
//     { x: 5, y: 11 },
//     { x: 6, y: 11 },
//     { x: 7, y: 11 },
//     { x: 8, y: 11 },
//     { x: 9, y: 11 },
//     { x: 10, y: 11 },
//     { x: 11, y: 11 },
//     { x: 12, y: 11 },
//     { x: 13, y: 11 },
//     { x: 14, y: 11 },
//   ];

//   const fakeXX = [
//     { x: 0, y: 20 },
//     { x: 1, y: 20 },
//     { x: 2, y: 20 },
//     { x: 3, y: 20 },
//     { x: 4, y: 20 },
//     { x: 5, y: 20 },
//     { x: 6, y: 20 },
//     { x: 7, y: 20 },
//     { x: 8, y: 20 },
//     { x: 9, y: 20 },
//   ];

//   const fakeYY = [
//     { x: 0, y: -5 },
//     { x: 1, y: -5 },
//     { x: 2, y: 20 },
//     { x: 3, y: 20 },
//     { x: 4, y: 20 },
//     { x: 5, y: 20 },
//     { x: 6, y: 20 },
//     { x: 7, y: 20 },
//     { x: 8, y: 20 },
//     { x: 9, y: 20 },
//   ];

//   const fakeLineXX = [
//     { x: 0, y: 2 },
//     { x: 1, y: 2 },
//     { x: 2, y: 2 },
//     { x: 3, y: 2 },
//     { x: 4, y: 2 },
//     { x: 5, y: 2 },
//     { x: 6, y: 2 },
//     { x: 7, y: 2 },
//     { x: 8, y: 2 },
//     { x: 9, y: 2 },
//   ];
//   const fakeLineYY = [
//     { x: 0, y: 0 },
//     { x: 1, y: 0 },
//     { x: 2, y: 0 },
//     { x: 3, y: 0 },
//     { x: 4, y: 0 },
//     { x: 5, y: 0 },
//     { x: 6, y: 0 },
//     { x: 7, y: 0 },
//     { x: 8, y: 0 },
//     { x: 9, y: 0 },
//   ];

//   const [marker1stItem, setMarker1stItem] = useState([{ x: 200, y: 200 }]);
//   const [marker2ndItem, setMarker2ndItem] = useState([{ x: 100, y: 800 }]);

//   useEffect(() => {
//     // Function to update the modeIndex every 3 seconds
//     const interval = setInterval(() => {
//       const randomFloat = Math.random(); // Generates a random floating-point number between 0 (inclusive) and 1 (exclusive)
//       const randomNumber = Math.floor(randomFloat * 800) + 100; // Generate a random integer between 1 and 9

//       const data = [{ x: randomNumber, y: randomNumber }];
//       setMarker1stItem(data);
//     }, 1000);

//     // Clean up the interval when the component unmounts
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     // Function to update the modeIndex every 3 seconds
//     const interval = setInterval(() => {
//       const randomFloat = Math.random(); // Generates a random floating-point number between 0 (inclusive) and 1 (exclusive)
//       const randomNumber = Math.floor(randomFloat * 8) + 1; // Generate a random integer between 1 and 9

//       const data = [{ x: randomNumber, y: 8.9 }];
//       setMarker2ndItem(data);
//     }, 1000);

//     // Clean up the interval when the component unmounts
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={{ height: "100%", width: "100%" }}>
//       <LineBox
//         redValue={redLine1stPanel}
//         greenValue={green1stPanel}
//         pinkValue={pinkValue1stPanel}
//         markerValue={marker1stItem}
//         fakeX={fakeXX}
//         fakeY={fakeYY}
//       />

//       <SingleLine
//         markerValue={marker2ndItem}
//         fakeX={fakeLineXX}
//         fakeY={fakeLineYY}
//       />

//       <LineBox
//         greenValue={green2ndPanel}
//         redValue={redLine2ndPanel}
//         pinkValue={pinkValue2ndPanel}
//         markerValue={marker2ndItem}
//         fakeX={fakeXX}
//         fakeY={fakeYY}
//       />
//     </div>
//   );
// };

// export default App;
