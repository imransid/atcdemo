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
const socket = io.connect(SOCKET_SERVER_URL);

const App = () => {
  // const [marker1stItem, setMarker1stItem] = useState([{ x: 0, y: 200 }]);
  const [marker1stItem, setMarker1stItem] = useState([{ x: 0, y: 1000 }]);
  const [marker2ndItem, setMarker2ndItem] = useState([{ x: 0, y: 400 }]);
  const [pointerPosition, setPointerPosition] = useState({ x: 10, y: 10 }); // Initial position
  const [moveStatusLeftRight, setMoveStatusLeftRight] = useState(false); // Initial position
  const [moveStatusAtcUPDown, setMoveStatusAtcUpDown] = useState(false); // Initial position

  const sendRhythmEvent = async (upDownStatus, data) => {
    console.log(data);
    const emitPayload = {
      senderName: "Neaz",
      targetUserName: upDownStatus ? "Rhythm" : "ATC",
      flightInfo: {
        flightName: "Flight123",
        top: data.x,
        left: data.y,
        right: 75.0,
        down: 10.0,
        speed: 10,
      },
    };
    socket.emit("messageSendToUser", emitPayload, async (status) => {
      console.log("Message sent : " + status);
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (moveStatusAtcUPDown === true || moveStatusLeftRight === true) {
        const step = 100; // Adjust the step size as needed
        let updatedPosition = {};
        if (moveStatusLeftRight) {
          updatedPosition = { ...marker2ndItem };
        }

        if (moveStatusAtcUPDown) {
          updatedPosition = { ...marker1stItem };
        }

        switch (event.key) {
          case "ArrowUp":
            updatedPosition[0].y += step;
            break;
          case "ArrowDown":
            updatedPosition[0].y -= step;
            break;
          default:
            return;
        }

        // Update the pointer position within bounds if needed
        //updatedPosition.x = Math.min(Math.max(updatedPosition.x, 10), 1000); // Adjust the bounds
        updatedPosition[0].y = Math.min(
          Math.max(updatedPosition[0].y, 10),
          1000
        ); // Adjust the bound

        if (moveStatusAtcUPDown) {
          setMarker1stItem([updatedPosition[0]]);
        }

        if (moveStatusLeftRight) {
          setMarker2ndItem([updatedPosition[0]]);
        }

        sendRhythmEvent(moveStatusAtcUPDown, updatedPosition[0]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    moveStatusAtcUPDown,
    moveStatusLeftRight,
    socket,
    marker1stItem,
    marker2ndItem,
  ]);

  const uniqueValueCheck = (data, info) => {
    if (info === 800) {
      return data + 20;
    } else if (info === 850) {
      return data + 30;
    } else if (info < 800) {
      return data + 50;
    } else if (info === 900) {
      return data - 20;
    } else if (info === 950) {
      return data - 30;
    } else if (info === 1400) {
      return 200;
    } else {
      return data - 50;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMarker1stItem((prevMarker) => {
        const newX1 = prevMarker[0].x >= 1400 ? 0 : prevMarker[0].x + 50;
        //const newY1 = prevMarker[0].y >= 1400 ? 0 : prevMarker[0].y + 50;
        // const newY1 =
        //   prevMarker[0].y === 1400
        //     ? 200
        //     : uniqueValueCheck(prevMarker[0].y, prevMarker[0].x);

        return [{ ...prevMarker[0], x: newX1 }];
      });
      setMarker2ndItem((prevMarker) => {
        const newX2 = prevMarker[0].x >= 1400 ? 0 : prevMarker[0].x + 50;
        return [{ ...prevMarker[0], x: newX2 }];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [moveStatusAtcUPDown]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          width: "100%",
        }}
      >
        {!moveStatusAtcUPDown ? (
          <button
            onClick={() => setMoveStatusAtcUpDown(true)}
            style={{ padding: 10 }}
          >
            Press To Control Panel
          </button>
        ) : (
          <button
            onClick={() => setMoveStatusAtcUpDown(false)}
            style={{ padding: 10, marginLeft: 20 }}
          >
            Cancel
          </button>
        )}
      </div>
      <LineBox
        redValue={redLine1stPanel}
        greenValue={green1stPanel}
        pinkValue={pinkValue1stPanel}
        markerValue={marker1stItem}
        fakeX={fakeXX}
        fakeY={fakeYY}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          width: "100%",
        }}
      >
        {!moveStatusLeftRight ? (
          <button
            onClick={() => setMoveStatusLeftRight(true)}
            style={{ padding: 10, marginLeft: 20 }}
          >
            Press To Control Panel
          </button>
        ) : (
          <button
            onClick={() => setMoveStatusLeftRight(false)}
            style={{ padding: 10, marginLeft: 20 }}
          >
            Cancel
          </button>
        )}
      </div>

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
