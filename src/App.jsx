import React, { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import logo from "./componant/Images/Logo.png";
import Admin from "./componant/Pages/SuperAdmin/Admin/Admin";

export default function App() {
  const teamsData = [
    { id: 1, name: "Team 1" },
    { id: 2, name: "Team 2" },
    { id: 3, name: "Team 3" },
    { id: 4, name: "Team 4" },
  ];
  const [search, setSearch] = useState("");

  const Navigate = useNavigate();

  const filteredTeams = teamsData.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div className="min-h-screen bg-[#c5c5c5] flex flex-col items-center justify-center py-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow">
            خليجيه كواترو 2025
          </h1>
          <p className="text-sm sm:text-base text-white opacity-80 drop-shadow">
            Monday 3 March 2025 - Friday 21 March 2025
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full">
          <div className="bg-blue-600 text-white rounded-t-lg px-4 py-3 flex items-center gap-6">
            <button
              onClick={() => Navigate("/info")}
              className="font-medium flex items-center gap-2 hover:bg-blue-700 rounded-md px-4 py-2"
            >
              <svg
                height="20px"
                width="20px"
                version="1.1"
                id="_x32_"
                viewBox="0 0 512 512"
                fill="#ffffff"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <style type="text/css"> </style>{" "}
                  <g>
                    {" "}
                    <path
                      class="st0"
                      d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,86.069 c28.463,0,51.538,23.074,51.538,51.538c0,28.464-23.074,51.538-51.538,51.538c-28.463,0-51.538-23.074-51.538-51.538 C204.462,109.143,227.537,86.069,256,86.069z M310.491,425.931H201.51v-43.593h35.667V276.329H215.38v-43.593h65.389v3.963v39.63 v106.009h29.722V425.931z"
                    ></path>{" "}
                  </g>{" "}
                </g>
              </svg>{" "}
              المعلومات
            </button>
            <button
              onClick={() => Navigate("/teams")}
              className="font-medium flex items-center gap-2 hover:bg-blue-700 rounded-md px-4 py-2"
            >
              <svg
                height="20px"
                width="20px"
                version="1.1"
                id="_x32_"
                viewBox="0 0 512 512"
                fill="#ffffff"
                stroke="#ffffff "
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <style type="text/css"> </style>{" "}
                  <g>
                    {" "}
                    <path
                      class="st0"
                      d="M435.95,287.525c32.51,0,58.87-26.343,58.87-58.853c0-32.51-26.361-58.871-58.87-58.871 c-32.502,0-58.863,26.361-58.863,58.871C377.088,261.182,403.448,287.525,435.95,287.525z"
                    ></path>{" "}
                    <path
                      class="st0"
                      d="M511.327,344.251c-2.623-15.762-15.652-37.822-25.514-47.677c-1.299-1.306-7.105-1.608-8.673-0.636 c-11.99,7.374-26.074,11.714-41.19,11.714c-15.099,0-29.184-4.34-41.175-11.714c-1.575-0.972-7.373-0.67-8.672,0.636 c-2.757,2.757-5.765,6.427-8.698,10.683c7.935,14.94,14.228,30.81,16.499,44.476c2.27,13.7,1.533,26.67-2.138,38.494 c13.038,4.717,28.673,6.787,44.183,6.787C476.404,397.014,517.804,382.987,511.327,344.251z"
                    ></path>{" "}
                    <path
                      class="st0"
                      d="M254.487,262.691c52.687,0,95.403-42.716,95.403-95.402c0-52.67-42.716-95.386-95.403-95.386 c-52.678,0-95.378,42.716-95.378,95.386C159.109,219.975,201.808,262.691,254.487,262.691z"
                    ></path>{" "}
                    <path
                      class="st0"
                      d="M335.269,277.303c-2.07-2.061-11.471-2.588-14.027-1.006c-19.448,11.966-42.271,18.971-66.755,18.971 c-24.466,0-47.3-7.005-66.738-18.971c-2.555-1.583-11.956-1.055-14.026,1.006c-16.021,16.004-37.136,51.782-41.384,77.288 c-10.474,62.826,56.634,85.508,122.148,85.508c65.532,0,132.639-22.682,122.165-85.508 C372.404,329.085,351.289,293.307,335.269,277.303z"
                    ></path>{" "}
                    <path
                      class="st0"
                      d="M76.049,287.525c32.502,0,58.862-26.343,58.862-58.853c0-32.51-26.36-58.871-58.862-58.871 c-32.511,0-58.871,26.361-58.871,58.871C17.178,261.182,43.538,287.525,76.049,287.525z"
                    ></path>{" "}
                    <path
                      class="st0"
                      d="M115.094,351.733c2.414-14.353,9.225-31.253,17.764-46.88c-2.38-3.251-4.759-6.083-6.955-8.279 c-1.299-1.306-7.097-1.608-8.672-0.636c-11.991,7.374-26.076,11.714-41.182,11.714c-15.108,0-29.202-4.34-41.183-11.714 c-1.568-0.972-7.382-0.67-8.681,0.636c-9.887,9.854-22.882,31.915-25.514,47.677c-6.468,38.736,34.924,52.762,75.378,52.762 c14.437,0,29.016-1.777,41.459-5.84C113.587,379.108,112.757,365.835,115.094,351.733z"
                    ></path>{" "}
                  </g>{" "}
                </g>
              </svg>
              الفرق
            </button>
            <button
              onClick={() => Navigate("/matches")}
              className="font-medium flex items-center gap-2 hover:bg-blue-700 rounded-md px-4 py-2"
            >
              اللاعبين
            </button>
            <button
              onClick={() => Navigate("/shedulde")}
              className="font-medium flex items-center gap-2 hover:bg-blue-700 rounded-md px-4 py-2"
            >
              {" "}
              المبارات الجدول
            </button>
            <img
              src={logo}
              alt="logo"
              className="w-20 h-20 flex justify-end items-center"
            />
          </div>
          <Outlet />
          <Admin />


        </div>
      </div>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap');
      </style>
    </>
  );
}