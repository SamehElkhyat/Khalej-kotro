import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Info from "./componant/Pages/Info/Info.jsx";
import App from "./App.jsx";
import Teams from "./componant/Pages/Teams/Teams.jsx";
import Matches from "./componant/Pages/Matches/Matches.jsx";
import Shedulde from "./componant/Pages/Shedulde/Shedulde.jsx";
import Admin from "./componant/Pages/SuperAdmin/Admin/Admin.jsx";
import LandingAdmin from "./componant/Pages/SuperAdmin/LandingAdmin/LandingAdmin.jsx";
import Acadimics from "./componant/Pages/SuperAdmin/Acadimics/Acadimics.jsx";
import Players from "./componant/Pages/SuperAdmin/Players/Players.jsx";
import MangeMatches from "./componant/Pages/SuperAdmin/MangeMatches/MangeMatches.jsx";
import MangeShedulde from "./componant/Pages/SuperAdmin/MangeSheduldematches/MangeShedulde.jsx";
import Camp from "./componant/Pages/SuperAdmin/Camp/Camp.jsx";
import ResultMatches from "./componant/Pages/SuperAdmin/ResultMatches/ResultMatches.jsx";
import TeamsRanking from "./componant/Pages/SuperAdmin/TeamsRanking/TeamsRanking.jsx";
import Login from "./componant/Pages/SuperAdmin/Login/Login.jsx";
import Rules from "./componant/Pages/SuperAdmin/Rules/Rules.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App/>,
    children: [

      { path: "info", element: <Info /> },
      { path: "teams", element: <Teams /> },
      { path: "matches", element: <Matches /> },
      { path: "shedulde", element: <Shedulde /> },
      { path: "admin", element: <Admin /> },
      { path: "landing-admin", element: <LandingAdmin /> },
      { path: "academies", element: <Acadimics /> },
      { path: "players", element: <Players /> },
      { path: "mange-matches", element: <MangeMatches /> },
      { path: "mange-shedulde", element: <MangeShedulde /> },
      { path: "camp", element: <Camp /> },
      { path: "result-matches", element: <ResultMatches /> },
      { path: "teams-ranking", element: <TeamsRanking /> },
      { path: "login", element: <Login /> },
      { path: "rules", element: <Rules /> },

    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RouterProvider router={router} />
);
