import React, { useState } from "react";

export default function NavBar() {
  const teamsData = [
    { id: 1, name: "Team 1" },
    { id: 2, name: "Team 2" },
    { id: 3, name: "Team 3" },
    { id: 4, name: "Team 4" },
  ];
  const [search, setSearch] = useState("");

  const filteredTeams = teamsData.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div className="min-h-screen bg-[#c5c5c5] flex flex-col items-center justify-center py-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow">
            ADQ Ramadan Tournament 2025
          </h1>
          <p className="text-sm sm:text-base text-white opacity-80 drop-shadow">
            Monday 3 March 2025 - Friday 21 March 2025
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full">
          <div className="bg-blue-600 text-white rounded-t-lg px-4 py-3 flex items-center gap-6">
            <button className="font-medium hover:underline">INFO</button>
            <button className="font-medium hover:underline">Teams</button>
            <button className="font-medium hover:underline">Players</button>
            <button className="font-medium hover:underline">SCHEDULE</button>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              <input
                type="text"
                placeholder="Find a team or player"
                className="flex-grow border p-2 rounded-md"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                SEARCH
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" id="showPlayers" />
              <label htmlFor="showPlayers" className="text-sm">
                Show players in teams
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredTeams.map((team) => (
                <div
                  key={team.id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <h3 className="text-lg font-medium">{team.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
