import React, { useState } from "react";




const TeamDetailsModal = ({ team, onClose }) => {
    if (!team) return null;
    
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <img src={team.logo} alt={team.name} className="modal-team-logo" />
            <h2>{team.name}</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          <div className="modal-body">
            <div className="team-stats">
              <div className="stat-item">
                <span className="stat-label">النقاط الحالية</span>
                <span className="stat-value">{team.score}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">المركز</span>
                <span className="stat-value">{team.position || '-'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">عدد المباريات</span>
                <span className="stat-value">{team.matches || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">الأهداف</span>
                <span className="stat-value">{team.goals || 0}</span>
              </div>
            </div>
            <div className="team-info-details">
              <h3>معلومات النادي</h3>
              <p><strong>تاريخ التأسيس:</strong> {team.established || '-'}</p>
              <p><strong>الملعب:</strong> {team.stadium || '-'}</p>
              <p><strong>المدرب:</strong> {team.coach || '-'}</p>
              <p><strong>الدوري:</strong> دوري أدنوك للمحترفين</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default function Shedulde() {
  const [openDays, setOpenDays] = useState({});
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [viewMode, setViewMode] = useState("all"); // 'all' or 'groups'

  
  const toggleDay = (dayIndex) => {


    
 

    setOpenDays((prev) => ({
      ...prev,
      [dayIndex]: !prev[dayIndex],
    }));
  };

  const teamsData = [
    {
      date: "Monday 3 March 2025",
      groups: [
        {
          name: "Group 1",
          column: "A",
          teams: [
            {
              name: "العين",
              score: 15,
              logo: "https://via.placeholder.com/150x150/1e40af/ffffff?text=العين",
              established: "1968",
              stadium: "استاد هزاع بن زايد",
              coach: "هيرنان كريسبو",
            },
            {
              name: "الوحدة",
              score: 12,
              logo: "https://via.placeholder.com/150x150/dc2626/ffffff?text=الوحدة",
              established: "1974",
              stadium: "استاد آل نهيان",
              coach: "مانويل خيمينيز",
            },
          ],
        },
        {
          name: "Group 1",
          column: "B",
          teams: [
            {
              name: "الجزيرة",
              score: 14,
              logo: "https://via.placeholder.com/150x150/059669/ffffff?text=الجزيرة",
            },
            {
              name: "الشارقة",
              score: 11,
              logo: "https://via.placeholder.com/150x150/7c3aed/ffffff?text=الشارقة",
            },
          ],
        },
        {
          name: "Group 2",
          column: "C",
          teams: [
            {
              name: "النصر",
              score: 9,
              logo: "https://via.placeholder.com/150x150/ea580c/ffffff?text=النصر",
            },
            {
              name: "الوصل",
              score: 13,
              logo: "https://via.placeholder.com/150x150/be185d/ffffff?text=الوصل",
            },
          ],
        },
      ],
    },
    {
      date: "Tuesday 4 March 2025",
      groups: [
        {
          name: "Group 3",
          column: "A",
          teams: [
            {
              name: "عجمان",
              score: 8,
              logo: "https://via.placeholder.com/150x150/0891b2/ffffff?text=عجمان",
            },
            {
              name: "بني ياس",
              score: 10,
              logo: "https://via.placeholder.com/150x150/16a34a/ffffff?text=بني+ياس",
            },
          ],
        },
        {
          name: "Group 3",
          column: "B",
          teams: [
            {
              name: "خورفكان",
              score: 7,
              logo: "https://via.placeholder.com/150x150/9333ea/ffffff?text=خورفكان",
            },
            {
              name: "الاتحاد",
              score: 6,
              logo: "https://via.placeholder.com/150x150/c2410c/ffffff?text=الاتحاد",
            },
          ],
        },
        {
          name: "Group 4",
          column: "C",
          teams: [
            {
              name: "الإمارات",
              score: 5,
              logo: "https://via.placeholder.com/150x150/0d9488/ffffff?text=الإمارات",
            },
            {
              name: "الشباب",
              score: 16,
              logo: "https://via.placeholder.com/150x150/be123c/ffffff?text=الشباب",
            },
          ],
        },
      ],
    },
  ];

  const showTeamDetails = (team) => {
    setSelectedTeam({
      ...team,
      established: "1968",
      stadium: "استاد هزاع بن زايد",
      coach: "هيرنان كريسبو",
      position: "3",
      matches: "15",
      goals: "25",
    });
  };
  return (
    <>
      <div>
        {teamsData.map((day, dayIndex) => (
          <div key={dayIndex} className="day-section">
            <div className="day-header" onClick={() => toggleDay(dayIndex)}>
              <h3>{day.date}</h3>
              <span className={`arrow ${openDays[dayIndex] ? "rotated" : ""}`}>
                ▼
              </span>
            </div>
            <div className={`groups-grid ${openDays[dayIndex] ? "open" : ""}`}>
              {day.groups.map((group, groupIndex) => (
                <div key={groupIndex} className="group-box">
                  <div className="group-title">
                    <span>{group.name}</span>
                    <span>Column {group.column}</span>
                  </div>
                  <div className="teams-list">
                    {group.teams.map((team, teamIndex) => (
                      <div key={teamIndex} className="team-row">
                        <div className="team-info">
                          <img src={team.logo} alt={team.name} />
                          <span>{team.name}</span>
                        </div>
                        <div className="team-actions">
                          <div
                            className={`score-badge ${
                              team.score > 2 ? "green" : "red"
                            }`}
                          >
                            {team.score}
                          </div>
                          <button
                            className="details-button"
                            onClick={() => showTeamDetails(team)}
                          >
                            التفاصيل
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedTeam && (
        <TeamDetailsModal
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
        />
      )}
    </>
  );
}
