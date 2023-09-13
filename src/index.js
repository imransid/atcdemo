import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Root from "../src/screens/Home";
import ControlPage from "./screens/Control";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "control",
    element: <ControlPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
