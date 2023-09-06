import React, { useEffect, useState } from "react";
import LinePlot from "../components/LinePlot";

const App = () => {
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

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <LinePlot />
    </div>
  );
};

export default App;
