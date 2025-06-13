import React, { useState } from 'react'
import './Teams.css'

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

// مكون البحث والفلترة
const SearchAndFilter = ({ searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  return (
    <div className="search-filter-container">
      <div className="search-box">
        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="البحث عن فريق..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="filter-box">
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="name">ترتيب حسب الاسم</option>
          <option value="score">ترتيب حسب النقاط</option>
          <option value="position">ترتيب حسب المركز</option>
          <option value="goals">ترتيب حسب الأهداف</option>
        </select>
      </div>
    </div>
  );
};

// مكون جديد لعرض جميع الفرق بطريقة مبتكرة
const AllTeamsGrid = ({ teams, onTeamClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [hoveredTeam, setHoveredTeam] = useState(null);

  // فلترة وبحث الفرق
  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ترتيب الفرق
  const sortedTeams = [...filteredTeams].sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return b.score - a.score;
      case 'position':
        return (a.position || 999) - (b.position || 999);
      case 'goals':
        return (b.goals || 0) - (a.goals || 0);
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // الحصول على أعلى 3 فرق حسب النقاط
  const topTeams = [...teams].sort((a, b) => b.score - a.score).slice(0, 3);

  return (
    <div className="all-teams-container">
      {/* عرض أفضل 3 فرق */}
      {searchTerm === '' && sortBy === 'name' && (
        <div className="top-teams-section">
          <h2 className="section-title">🏆 أفضل 3 فرق</h2>
          <div className="top-teams-grid">
            {topTeams.map((team, index) => (
              <div 
                key={team.id} 
                className={`top-team-card rank-${index + 1}`}
                onClick={() => onTeamClick(team)}
              >
                <div className="rank-badge">{index + 1}</div>
                <img src={team.logo} alt={team.name} className="top-team-logo" />
                <h3 className="top-team-name">{team.name}</h3>
                <div className="top-team-score">{team.score} نقطة</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <SearchAndFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      {sortedTeams.length === 0 ? (
        <div className="no-results">
          <svg className="no-results-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.08 2.33" />
          </svg>
          <h3>لا توجد نتائج</h3>
          <p>جرب البحث بكلمات مختلفة</p>
        </div>
      ) : (
        <div className="teams-grid">
          {sortedTeams.map((team, index) => (
            <div 
              key={team.id || index} 
              className={`team-card ${hoveredTeam === team.id ? 'hovered' : ''}`}
              onClick={() => onTeamClick(team)}
              onMouseEnter={() => setHoveredTeam(team.id)}
              onMouseLeave={() => setHoveredTeam(null)}
            >
              <div className="team-card-header">
                <div className="team-logo-container">
                  <img src={team.logo} alt={team.name} className="team-logo" />
                  <div className="team-score-badge">
                    {team.score}
                  </div>
                </div>
                <div className="team-info">
                  <h3 className="team-name">{team.name}</h3>
                  <div className="team-meta">
                    <span className="team-position">المركز: {team.position || 'غير محدد'}</span>
                    <span className="team-matches">المباريات: {team.matches || 0}</span>
                  </div>
                </div>
              </div>
              <div className="team-card-footer">
                <div className="team-stats-mini">
                  <div className="stat-mini">
                    <span className="stat-label-mini">الأهداف</span>
                    <span className="stat-value-mini">{team.goals || 0}</span>
                  </div>
                  <div className="stat-mini">
                    <span className="stat-label-mini">النقاط</span>
                    <span className="stat-value-mini">{team.score}</span>
                  </div>
                </div>
                <button className="view-details-btn">
                  عرض التفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="teams-summary">
        <div className="summary-item">
          <span className="summary-label">إجمالي الفرق</span>
          <span className="summary-value">{teams.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">الفرق المعروضة</span>
          <span className="summary-value">{sortedTeams.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">أعلى نقاط</span>
          <span className="summary-value">{Math.max(...teams.map(t => t.score))}</span>
        </div>
      </div>
    </div>
  );
};

export default function Teams() {
  const [openDays, setOpenDays] = useState({})
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [viewMode, setViewMode] = useState('all') // 'all' or 'groups'

  const toggleDay = (dayIndex) => {
    setOpenDays(prev => ({
      ...prev,
      [dayIndex]: !prev[dayIndex]
    }))
  }

  const showTeamDetails = (team) => {
    setSelectedTeam({
      ...team,
      established: "1968",
      stadium: "استاد هزاع بن زايد",
      coach: "هيرنان كريسبو",
      position: "3",
      matches: "15",
      goals: "25"
    });
  };

  // تجميع جميع الفرق من جميع الأيام والمجموعات
  const getAllTeams = () => {
    const allTeams = [];
    teamsData.forEach(day => {
      day.groups.forEach(group => {
        group.teams.forEach(team => {
          if (!allTeams.find(t => t.name === team.name)) {
            allTeams.push({
              ...team,
              id: allTeams.length + 1,
              position: Math.floor(Math.random() * 12) + 1,
              matches: Math.floor(Math.random() * 20) + 5,
              goals: Math.floor(Math.random() * 30) + 10
            });
          }
        });
      });
    });
    return allTeams;
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
              coach: "هيرنان كريسبو"
            },
            { 
              name: "الوحدة",
              score: 12, 
              logo: "https://via.placeholder.com/150x150/dc2626/ffffff?text=الوحدة",
              established: "1974",
              stadium: "استاد آل نهيان",
              coach: "مانويل خيمينيز"
            }
          ]
        },
        {
          name: "Group 1",
          column: "B",
          teams: [
            { 
              name: "الجزيرة", 
              score: 14, 
              logo: "https://via.placeholder.com/150x150/059669/ffffff?text=الجزيرة"
            },
            { 
              name: "الشارقة", 
              score: 11, 
              logo: "https://via.placeholder.com/150x150/7c3aed/ffffff?text=الشارقة"
            }
          ]
        },
        {
          name: "Group 2",
          column: "C",
          teams: [
            { 
              name: "النصر", 
              score: 9, 
              logo: "https://via.placeholder.com/150x150/ea580c/ffffff?text=النصر"
            },
            { 
              name: "الوصل", 
              score: 13, 
              logo: "https://via.placeholder.com/150x150/be185d/ffffff?text=الوصل"
            }
          ]
        }
      ]
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
              logo: "https://via.placeholder.com/150x150/0891b2/ffffff?text=عجمان"
            },
            { 
              name: "بني ياس", 
              score: 10, 
              logo: "https://via.placeholder.com/150x150/16a34a/ffffff?text=بني+ياس"
            }
          ]
        },
        {
          name: "Group 3",
          column: "B",
          teams: [
            { 
              name: "خورفكان", 
              score: 7, 
              logo: "https://via.placeholder.com/150x150/9333ea/ffffff?text=خورفكان"
            },
            { 
              name: "الاتحاد", 
              score: 6, 
              logo: "https://via.placeholder.com/150x150/c2410c/ffffff?text=الاتحاد"
            }
          ]
        },
        {
          name: "Group 4",
          column: "C",
          teams: [
            { 
              name: "الإمارات", 
              score: 5, 
              logo: "https://via.placeholder.com/150x150/0d9488/ffffff?text=الإمارات"
            },
            { 
              name: "الشباب", 
              score: 16, 
              logo: "https://via.placeholder.com/150x150/be123c/ffffff?text=الشباب"
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className="teams-page">
      <div className="view-toggle-container">
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === 'all' ? 'active' : ''}`}
            onClick={() => setViewMode('all')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            عرض جميع الفرق
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'groups' ? 'active' : ''}`}
            onClick={() => setViewMode('groups')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            عرض المجموعات
          </button>
        </div>
      </div>

      {/* عرض جميع الفرق */}
      {viewMode === 'all' && (
        <AllTeamsGrid 
          teams={getAllTeams()} 
          onTeamClick={showTeamDetails}
        />
      )}

      {/* عرض المجموعات (العرض الأصلي) */}
      {viewMode === 'groups' && (
        <div>
          {teamsData.map((day, dayIndex) => (
            <div key={dayIndex} className="day-section">
              <div className="day-header" onClick={() => toggleDay(dayIndex)}>
                <h3>{day.date}</h3>
                <span className={`arrow ${openDays[dayIndex] ? 'rotated' : ''}`}>▼</span>
              </div>
              <div className={`groups-grid ${openDays[dayIndex] ? 'open' : ''}`}>
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
                            <div className={`score-badge ${team.score > 2 ? 'green' : 'red'}`}>
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
      )}

      {/* Modal */}
      {selectedTeam && (
        <TeamDetailsModal 
          team={selectedTeam} 
          onClose={() => setSelectedTeam(null)} 
        />
      )}

      {/* كود HTML كامل للفرق الإماراتية */}
      <div className="uae-teams-html-section">
        <div className="uae-teams-container">
          <div className="uae-teams-header">
            <h1 className="uae-teams-title">🏆 الفرق الإماراتية في خليجية كواترو 2025</h1>
            <p className="uae-teams-subtitle">جميع الفرق المشاركة في البطولة مع تفاصيلها الكاملة</p>
          </div>
          
          <div className="uae-teams-grid">
            <div className="uae-team-card">
              <div className="uae-team-logo">
                <img src="https://via.placeholder.com/150x150/1e40af/ffffff?text=العين" alt="العين" />
              </div>
              <div className="uae-team-info">
                <h3 className="uae-team-name">العين</h3>
                <p className="uae-team-description">نادي العين لكرة القدم - أحد أقوى الأندية في الإمارات وأكثرها تتويجاً بالألقاب</p>
                <div className="uae-team-stats">
                  <span className="uae-team-stat">النقاط: 15</span>
                  <span className="uae-team-stat">المركز: 1</span>
                  <span className="uae-team-stat">المباريات: 18</span>
                </div>
                <div className="uae-team-players">
                  <h4>👥 قائمة اللاعبين</h4>
                  <ul className="uae-players-list">
                    <li>👑 أحمد عبدالله - كابتن</li>
                    <li>محمد علي - لاعب</li>
                    <li>علي حسن - لاعب</li>
                    <li>يوسف أحمد - لاعب</li>
                    <li>خالد محمد - لاعب</li>
                    <li>عمر سعيد - لاعب</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="uae-team-card">
              <div className="uae-team-logo">
                <img src="https://via.placeholder.com/150x150/dc2626/ffffff?text=الوحدة" alt="الوحدة" />
              </div>
              <div className="uae-team-info">
                <h3 className="uae-team-name">الوحدة</h3>
                <p className="uae-team-description">نادي الوحدة - من أعرق الأندية الإماراتية وأكثرها شعبية في أبوظبي</p>
                <div className="uae-team-stats">
                  <span className="uae-team-stat">النقاط: 12</span>
                  <span className="uae-team-stat">المركز: 2</span>
                  <span className="uae-team-stat">المباريات: 16</span>
                </div>
                <div className="uae-team-players">
                  <h4>👥 قائمة اللاعبين</h4>
                  <ul className="uae-players-list">
                    <li>👑 سعيد راشد - كابتن</li>
                    <li>عبدالله محمد - لاعب</li>
                    <li>حسن علي - لاعب</li>
                    <li>أحمد يوسف - لاعب</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="uae-team-card">
              <div className="uae-team-logo">
                <img src="https://via.placeholder.com/150x150/059669/ffffff?text=الجزيرة" alt="الجزيرة" />
              </div>
              <div className="uae-team-info">
                <h3 className="uae-team-name">الجزيرة</h3>
                <p className="uae-team-description">نادي الجزيرة - من أقوى الأندية في أبوظبي وله تاريخ عريق في كرة القدم</p>
                <div className="uae-team-stats">
                  <span className="uae-team-stat">النقاط: 14</span>
                  <span className="uae-team-stat">المركز: 3</span>
                  <span className="uae-team-stat">المباريات: 17</span>
                </div>
                <div className="uae-team-players">
                  <h4>👥 قائمة اللاعبين</h4>
                  <ul className="uae-players-list">
                    <li>👑 محمد سعيد - كابتن</li>
                    <li>علي أحمد - لاعب</li>
                    <li>يوسف محمد - لاعب</li>
                    <li>خالد علي - لاعب</li>
                    <li>عمر أحمد - لاعب</li>
                    <li>سعيد محمد - لاعب</li>
                    <li>أحمد علي - لاعب</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="uae-team-card">
              <div className="uae-team-logo">
                <img src="https://via.placeholder.com/150x150/7c3aed/ffffff?text=الشارقة" alt="الشارقة" />
              </div>
              <div className="uae-team-info">
                <h3 className="uae-team-name">الشارقة</h3>
                <p className="uae-team-description">نادي الشارقة - من أقدم الأندية في الإمارات وأول من فاز بدوري الخليج العربي</p>
                <div className="uae-team-stats">
                  <span className="uae-team-stat">النقاط: 11</span>
                  <span className="uae-team-stat">المركز: 4</span>
                  <span className="uae-team-stat">المباريات: 15</span>
                </div>
                <div className="uae-team-players">
                  <h4>👥 قائمة اللاعبين</h4>
                  <ul className="uae-players-list">
                    <li>👑 عبدالله سعيد - كابتن</li>
                    <li>محمد أحمد - لاعب</li>
                    <li>علي محمد - لاعب</li>
                    <li>يوسف علي - لاعب</li>
                    <li>خالد أحمد - لاعب</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="uae-team-card">
              <div className="uae-team-logo">
                <img src="https://via.placeholder.com/150x150/ea580c/ffffff?text=النصر" alt="النصر" />
              </div>
              <div className="uae-team-info">
                <h3 className="uae-team-name">النصر</h3>
                <p className="uae-team-description">نادي النصر - من الأندية التاريخية في دبي وله قاعدة جماهيرية كبيرة</p>
                <div className="uae-team-stats">
                  <span className="uae-team-stat">النقاط: 9</span>
                  <span className="uae-team-stat">المركز: 5</span>
                  <span className="uae-team-stat">المباريات: 14</span>
                </div>
                <div className="uae-team-players">
                  <h4>👥 قائمة اللاعبين</h4>
                  <ul className="uae-players-list">
                    <li>👑 سعيد محمد - كابتن</li>
                    <li>أحمد علي - لاعب</li>
                    <li>محمد يوسف - لاعب</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="uae-team-card">
              <div className="uae-team-logo">
                <img src="https://via.placeholder.com/150x150/be185d/ffffff?text=الوصل" alt="الوصل" />
              </div>
              <div className="uae-team-info">
                <h3 className="uae-team-name">الوصل</h3>
                <p className="uae-team-description">نادي الوصل - من الأندية العريقة في دبي وله تاريخ مشرف في كرة القدم</p>
                <div className="uae-team-stats">
                  <span className="uae-team-stat">النقاط: 13</span>
                  <span className="uae-team-stat">المركز: 6</span>
                  <span className="uae-team-stat">المباريات: 16</span>
                </div>
                <div className="uae-team-players">
                  <h4>👥 قائمة اللاعبين</h4>
                  <ul className="uae-players-list">
                    <li>👑 علي سعيد - كابتن</li>
                    <li>يوسف محمد - لاعب</li>
                    <li>خالد أحمد - لاعب</li>
                    <li>عمر علي - لاعب</li>
                    <li>أحمد محمد - لاعب</li>
                    <li>محمد يوسف - لاعب</li>
                    <li>سعيد علي - لاعب</li>
                    <li>علي أحمد - لاعب</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="uae-team-card">
              <div className="uae-team-logo">
                <img src="https://via.placeholder.com/150x150/0891b2/ffffff?text=عجمان" alt="عجمان" />
              </div>
              <div className="uae-team-info">
                <h3 className="uae-team-name">عجمان</h3>
                <p className="uae-team-description">نادي عجمان - من الأندية المهمة في إمارة عجمان وله دور بارز في تطوير كرة القدم</p>
                <div className="uae-team-stats">
                  <span className="uae-team-stat">النقاط: 8</span>
                  <span className="uae-team-stat">المركز: 7</span>
                  <span className="uae-team-stat">المباريات: 13</span>
                </div>
                <div className="uae-team-players">
                  <h4>👥 قائمة اللاعبين</h4>
                  <ul className="uae-players-list">
                    <li>👑 راشد علي - كابتن</li>
                    <li>عبدالله حسن - لاعب</li>
                    <li>محمد سعيد - لاعب</li>
                    <li>أحمد يوسف - لاعب</li>
                    <li>علي محمد - لاعب</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="uae-team-card">
              <div className="uae-team-logo">
                <img src="https://via.placeholder.com/150x150/16a34a/ffffff?text=بني+ياس" alt="بني ياس" />
              </div>
              <div className="uae-team-info">
                <h3 className="uae-team-name">بني ياس</h3>
                <p className="uae-team-description">نادي بني ياس - من الأندية المهمة في أبوظبي وله قاعدة جماهيرية قوية</p>
                <div className="uae-team-stats">
                  <span className="uae-team-stat">النقاط: 10</span>
                  <span className="uae-team-stat">المركز: 8</span>
                  <span className="uae-team-stat">المباريات: 15</span>
                </div>
                <div className="uae-team-players">
                  <h4>👥 قائمة اللاعبين</h4>
                  <ul className="uae-players-list">
                    <li>👑 حسن راشد - كابتن</li>
                    <li>سعيد أحمد - لاعب</li>
                    <li>عبدالله علي - لاعب</li>
                    <li>محمد حسن - لاعب</li>
                    <li>يوسف سعيد - لاعب</li>
                    <li>أحمد عبدالله - لاعب</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="uae-team-card">
              <div className="uae-team-logo">
                <img src="https://via.placeholder.com/150x150/9333ea/ffffff?text=خورفكان" alt="خورفكان" />
              </div>
              <div className="uae-team-info">
                <h3 className="uae-team-name">خورفكان</h3>
                <p className="uae-team-description">نادي خورفكان - من الأندية المهمة في إمارة الشارقة وله تاريخ عريق</p>
                <div className="uae-team-stats">
                  <span className="uae-team-stat">النقاط: 7</span>
                  <span className="uae-team-stat">المركز: 9</span>
                  <span className="uae-team-stat">المباريات: 12</span>
                </div>
                <div className="uae-team-players">
                  <h4>👥 قائمة اللاعبين</h4>
                  <ul className="uae-players-list">
                    <li>👑 علي محمد - كابتن</li>
                    <li>أحمد حسن - لاعب</li>
                    <li>محمد علي - لاعب</li>
                    <li>يوسف أحمد - لاعب</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="uae-team-card">
              <div className="uae-team-logo">
                <img src="https://via.placeholder.com/150x150/c2410c/ffffff?text=الاتحاد" alt="الاتحاد" />
              </div>
              <div className="uae-team-info">
                <h3 className="uae-team-name">الاتحاد</h3>
                <p className="uae-team-description">نادي الاتحاد - من الأندية المهمة في كلباء وله دور بارز في تطوير كرة القدم المحلية</p>
                <div className="uae-team-stats">
                  <span className="uae-team-stat">النقاط: 6</span>
                  <span className="uae-team-stat">المركز: 10</span>
                  <span className="uae-team-stat">المباريات: 11</span>
                </div>
                <div className="uae-team-players">
                  <h4>👥 قائمة اللاعبين</h4>
                  <ul className="uae-players-list">
                    <li>👑 سعيد يوسف - كابتن</li>
                    <li>عبدالله محمد - لاعب</li>
                    <li>حسن أحمد - لاعب</li>
                    <li>علي سعيد - لاعب</li>
                    <li>محمد عبدالله - لاعب</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="uae-team-card">
              <div className="uae-team-logo">
                <img src="https://via.placeholder.com/150x150/0d9488/ffffff?text=الإمارات" alt="الإمارات" />
              </div>
              <div className="uae-team-info">
                <h3 className="uae-team-name">الإمارات</h3>
                <p className="uae-team-description">نادي الإمارات - من الأندية المهمة في رأس الخيمة وله تاريخ مشرف</p>
                <div className="uae-team-stats">
                  <span className="uae-team-stat">النقاط: 5</span>
                  <span className="uae-team-stat">المركز: 11</span>
                  <span className="uae-team-stat">المباريات: 10</span>
                </div>
                <div className="uae-team-players">
                  <h4>👥 قائمة اللاعبين</h4>
                  <ul className="uae-players-list">
                    <li>👑 أحمد علي - كابتن</li>
                    <li>محمد حسن - لاعب</li>
                    <li>يوسف محمد - لاعب</li>
                    <li>علي أحمد - لاعب</li>
                    <li>سعيد يوسف - لاعب</li>
                    <li>عبدالله علي - لاعب</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="uae-team-card">
              <div className="uae-team-logo">
                <img src="https://via.placeholder.com/150x150/be123c/ffffff?text=الشباب" alt="الشباب" />
              </div>
              <div className="uae-team-info">
                <h3 className="uae-team-name">الشباب</h3>
                <p className="uae-team-description">نادي الشباب - من الأندية المهمة في دبي وله تاريخ عريق في كرة القدم</p>
                <div className="uae-team-stats">
                  <span className="uae-team-stat">النقاط: 16</span>
                  <span className="uae-team-stat">المركز: 12</span>
                  <span className="uae-team-stat">المباريات: 19</span>
                </div>
                <div className="uae-team-players">
                  <h4>👥 قائمة اللاعبين</h4>
                  <ul className="uae-players-list">
                    <li>👑 محمد سعيد - كابتن</li>
                    <li>علي أحمد - لاعب</li>
                    <li>يوسف محمد - لاعب</li>
                    <li>أحمد علي - لاعب</li>
                    <li>حسن يوسف - لاعب</li>
                    <li>سعيد محمد - لاعب</li>
                    <li>عبدالله أحمد - لاعب</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
