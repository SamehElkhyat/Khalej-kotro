import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Info from "./componant/Pages/Info/Info.jsx";
import App from "./App.jsx";
import Teams from "./componant/Pages/Teams/Teams.jsx";
import Matches from "./componant/Pages/Matches/Matches.jsx";
import Shedulde from "./componant/Pages/Shedulde/Shedulde.jsx";
const router = createBrowserRouter([
  {
    path: "",
    element: <App/>,
    children: [
      { path: "info", element: <Info /> },
      { path: "teams", element: <Teams /> },
      { path: "matches", element: <Matches /> },
      { path: "shedulde", element: <Shedulde /> },

    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RouterProvider router={router} />
);
