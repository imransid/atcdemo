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

  // console.log("isConnected", isConnected, fooEvents);

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
      />
    </div>
  );
};

export default App;

// import React, { useState, useEffect } from "react";
// import ReactApexChart from "react-apexcharts";
// import io from "socket.io-client";

// const SOCKET_SERVER_URL = "http://103.147.182.59:8878";
// const socket = io(SOCKET_SERVER_URL);

// const ChartComponent = () => {
//   const [dataSeries, setDataSeries] = useState([
//     {
//       name: "Data",
//       data: [], // Initial data array
//     },
//   ]);

//   const [xAxisCategories, setXAxisCategories] = useState([]);

//   const [isConnected, setIsConnected] = useState(socket.connected);
//   const [fooEvents, setFooEvents] = useState([]);

//   useEffect(() => {
//     function onConnect() {
//       setIsConnected(true);
//     }

//     function onDisconnect() {
//       setIsConnected(false);
//     }

//     const onFooEvent = (value) => {
//       if (value && value.flightInfo) {
//         const { top, left } = value.flightInfo;
//         const newTopValue = parseFloat(top); // Convert to float if needed
//         const newLeftValue = parseFloat(left); // Convert to float if needed

//         setDataSeries((prevDataSeries) => [
//           {
//             data: [...prevDataSeries[0].data, newLeftValue], // Update with new left value
//           },
//         ]);

//         setXAxisCategories((prevCategories) => [
//           ...prevCategories,
//           new Date().toLocaleTimeString(),
//         ]);
//       }
//     };

//     function onFooEventATC(value) {
//       console.log(value);
//       // console.log(value);
//       // if (value && value.flightInfo) {
//       //   const { top, left } = value.flightInfo;
//       //   const newData = [{ x: top, y: left }];
//       //   setMarker2ndItem(newData);
//       // }
//     }

//     socket.on("connect", onConnect);
//     socket.on("disconnect", onDisconnect);
//     socket.on("Rhythm", onFooEvent);
//     socket.on("ATC", onFooEventATC);

//     return () => {
//       socket.off("connect", onConnect);
//       socket.off("disconnect", onDisconnect);
//       socket.off("foo", onFooEvent);
//     };
//   }, []);

//   useEffect(() => {
//     //const interval = setInterval(updateData, 1000);
//     // return () => {
//     //   clearInterval(interval); // Clear interval when component unmounts
//     // };
//   }, []);

//   const updateData = () => {
//     // Generate a random data point
//     const newDataPoint = Math.floor(Math.random() * 100);

//     setDataSeries((prevDataSeries) => [
//       {
//         data: [...prevDataSeries[0].data, newDataPoint],
//       },
//     ]);

//     setXAxisCategories((prevCategories) => [
//       ...prevCategories,
//       new Date().toLocaleTimeString(),
//     ]);
//   };

//   const chartOptions = {
//     chart: {
//       id: "realtime-chart",
//       animations: {
//         enabled: true,
//         easing: "linear",
//         dynamicAnimation: {
//           speed: 1000, // Animation speed in milliseconds
//         },
//       },
//     },
//     xaxis: {
//       categories: xAxisCategories,
//     },
//   };

//   return (
//     <div className="chart">
//       <ReactApexChart
//         options={chartOptions}
//         series={dataSeries}
//         type="line"
//         height={350}
//       />
//     </div>
//   );
// };

// export default ChartComponent;
