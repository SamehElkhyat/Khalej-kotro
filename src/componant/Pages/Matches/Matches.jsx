import React, { useEffect, useState } from 'react'
import './Matches.css'
import axios from 'axios';

// مكون عرض تفاصيل الفريق مع اللاعبين
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
          <div className="team-description">
            <p>{team.description}</p>
          </div>
          <div className="team-stats">
            <div className="stat-item">
              <span className="stat-label">عدد الأعضاء</span>
              <span className="stat-value">{team.members.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">الكابتن</span>
              <span className="stat-value">{team.members.find(m => m.role === 'Captain')?.name || '-'}</span>
            </div>
          </div>
          <div className="players-section">
            <h3>👥 قائمة اللاعبين</h3>
            <div className="players-grid">
              {team.members.map((member, index) => (
                <div key={member.id} className="player-card">
                  <div className="player-avatar">
                    <span className="player-number">{index + 1}</span>
                  </div>
                  <div className="player-info">
                    <h4 className="player-name">{member.name}</h4>
                    <span className={`player-role ${member.role === 'Captain' ? 'captain' : 'member'}`}>
                      {member.role === 'Captain' ? '👑 كابتن' : 'لاعب'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// مكون البحث والفلترة
const SearchAndFilter = ({ searchTerm, setSearchTerm, filterBy, setFilterBy }) => {
  return (
    <div className="search-filter-container">
      <div className="search-box">
        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="البحث عن فريق أو لاعب..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="filter-box">
        <select 
          value={filterBy} 
          onChange={(e) => setFilterBy(e.target.value)}
          className="filter-select"
        >
          <option value="all">جميع الفرق</option>
          <option value="captain">الفرق مع كابتن</option>
          <option value="large">الفرق الكبيرة (5+ لاعبين)</option>
          <option value="small">الفرق الصغيرة (أقل من 5 لاعبين)</option>
        </select>
      </div>
    </div>
  );
};

// مكون عرض الفرق مع اللاعبين
const TeamsWithPlayersGrid = ({ teams, onTeamClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [hoveredTeam, setHoveredTeam] = useState(null);

const AllMatches = async () => {
try { 
  const response = await axios.get("https://sports.runasp.net/api/Get-Matches",{
 
  });
  console.log(response);
} catch (error) {
  console.log(error);
}

}


  // فلترة وبحث الفرق
  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.members.some(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesFilter = true;
    switch (filterBy) {
      case 'captain':
        matchesFilter = team.members.some(member => member.role === 'Captain');
        break;
      case 'large':
        matchesFilter = team.members.length >= 5;
        break;
      case 'small':
        matchesFilter = team.members.length < 5;
        break;
      default:
        matchesFilter = true;
    }
    
    return matchesSearch && matchesFilter;
  });

  // ترتيب الفرق حسب عدد الأعضاء
  const sortedTeams = [...filteredTeams].sort((a, b) => b.members.length - a.members.length);
useEffect(() => {
  AllMatches();
}, []);
  return (
    <div className="teams-players-container">
      <SearchAndFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
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
        <div className="teams-players-grid">
          {sortedTeams.map((team, index) => (
            <div 
              key={team.id} 
              className={`team-player-card ${hoveredTeam === team.id ? 'hovered' : ''}`}
              onClick={() => onTeamClick(team)}
              onMouseEnter={() => setHoveredTeam(team.id)}
              onMouseLeave={() => setHoveredTeam(null)}
            >
              <div className="team-player-header">
                <div className="team-logo-container">
                  <img src={team.logo} alt={team.name} className="team-logo" />
                  <div className="team-members-badge">
                    {team.members.length}
                  </div>
                </div>
                <div className="team-info">
                  <h3 className="team-name">{team.name}</h3>
                  <p className="team-description">{team.description}</p>
                  <div className="team-meta">
                    <span className="team-captain">
                      👑 {team.members.find(m => m.role === 'Captain')?.name || 'غير محدد'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="players-preview">
                <h4 className="players-preview-title">👥 اللاعبين ({team.members.length})</h4>
                <div className="players-list">
                  {team.members.slice(0, 4).map((member, memberIndex) => (
                    <div key={member.id} className="player-preview-item">
                      <div className="player-avatar-small">
                        <span className="player-number-small">{memberIndex + 1}</span>
                      </div>
                      <span className="player-name-small">{member.name}</span>
                      {member.role === 'Captain' && <span className="captain-badge">👑</span>}
                    </div>
                  ))}
                  {team.members.length > 4 && (
                    <div className="more-players">
                      +{team.members.length - 4} لاعبين آخرين
                    </div>
                  )}
                </div>
              </div>
              
              <div className="team-player-footer">
                <button className="view-team-details-btn">
                  عرض تفاصيل الفريق
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
          <span className="summary-label">إجمالي اللاعبين</span>
          <span className="summary-value">{teams.reduce((total, team) => total + team.members.length, 0)}</span>
        </div>
      </div>
    </div>
  );
};

export default function Matches() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const AllMatches = async () => {
    console.log("AllMatches");
    try { 
      const response = await axios.get("https://sports.runasp.net/api/Get-Matches",{
     
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    
    }
    useEffect(() => {
      AllMatches();
      console.log(AllMatches);
    }, []);
  const showTeamDetails = (team) => {
    setSelectedTeam(team);
  };

  const teams = [
    {
      id: 1,
      name: 'العين',
      logo: 'https://via.placeholder.com/150x150/1e40af/ffffff?text=العين',
      description: 'نادي العين لكرة القدم - أحد أقوى الأندية في الإمارات وأكثرها تتويجاً بالألقاب',
      members: [
        { id: 1, name: 'أحمد عبدالله', role: 'Captain' },
        { id: 2, name: 'محمد علي', role: 'Member' },
        { id: 3, name: 'علي حسن', role: 'Member' },
        { id: 4, name: 'يوسف أحمد', role: 'Member' },
        { id: 5, name: 'خالد محمد', role: 'Member' },
        { id: 6, name: 'عمر سعيد', role: 'Member' }
      ]
    },
    {
      id: 2,
      name: 'الوحدة',
      logo: 'https://via.placeholder.com/150x150/dc2626/ffffff?text=الوحدة',
      description: 'نادي الوحدة - من أعرق الأندية الإماراتية وأكثرها شعبية في أبوظبي',
      members: [
        { id: 7, name: 'سعيد راشد', role: 'Captain' },
        { id: 8, name: 'عبدالله محمد', role: 'Member' },
        { id: 9, name: 'حسن علي', role: 'Member' },
        { id: 10, name: 'أحمد يوسف', role: 'Member' }
      ]
    },
    {
      id: 3,
      name: 'الجزيرة',
      logo: 'https://via.placeholder.com/150x150/059669/ffffff?text=الجزيرة',
      description: 'نادي الجزيرة - من أقوى الأندية في أبوظبي وله تاريخ عريق في كرة القدم',
      members: [
        { id: 11, name: 'محمد سعيد', role: 'Captain' },
        { id: 12, name: 'علي أحمد', role: 'Member' },
        { id: 13, name: 'يوسف محمد', role: 'Member' },
        { id: 14, name: 'خالد علي', role: 'Member' },
        { id: 15, name: 'عمر أحمد', role: 'Member' },
        { id: 16, name: 'سعيد محمد', role: 'Member' },
        { id: 17, name: 'أحمد علي', role: 'Member' }
      ]
    },
    {
      id: 4,
      name: 'الشارقة',
      logo: 'https://via.placeholder.com/150x150/7c3aed/ffffff?text=الشارقة',
      description: 'نادي الشارقة - من أقدم الأندية في الإمارات وأول من فاز بدوري الخليج العربي',
      members: [
        { id: 18, name: 'عبدالله سعيد', role: 'Captain' },
        { id: 19, name: 'محمد أحمد', role: 'Member' },
        { id: 20, name: 'علي محمد', role: 'Member' },
        { id: 21, name: 'يوسف علي', role: 'Member' },
        { id: 22, name: 'خالد أحمد', role: 'Member' }
      ]
    },
    {
      id: 5,
      name: 'النصر',
      logo: 'https://via.placeholder.com/150x150/ea580c/ffffff?text=النصر',
      description: 'نادي النصر - من الأندية التاريخية في دبي وله قاعدة جماهيرية كبيرة',
      members: [
        { id: 23, name: 'سعيد محمد', role: 'Captain' },
        { id: 24, name: 'أحمد علي', role: 'Member' },
        { id: 25, name: 'محمد يوسف', role: 'Member' }
      ]
    },
    {
      id: 6,
      name: 'الوصل',
      logo: 'https://via.placeholder.com/150x150/be185d/ffffff?text=الوصل',
      description: 'نادي الوصل - من الأندية العريقة في دبي وله تاريخ مشرف في كرة القدم',
      members: [
        { id: 26, name: 'علي سعيد', role: 'Captain' },
        { id: 27, name: 'يوسف محمد', role: 'Member' },
        { id: 28, name: 'خالد أحمد', role: 'Member' },
        { id: 29, name: 'عمر علي', role: 'Member' },
        { id: 30, name: 'أحمد محمد', role: 'Member' },
        { id: 31, name: 'محمد يوسف', role: 'Member' },
        { id: 32, name: 'سعيد علي', role: 'Member' },
        { id: 33, name: 'علي أحمد', role: 'Member' }
      ]
    },
    {
      id: 7,
      name: 'عجمان',
      logo: 'https://via.placeholder.com/150x150/0891b2/ffffff?text=عجمان',
      description: 'نادي عجمان - من الأندية المهمة في إمارة عجمان وله دور بارز في تطوير كرة القدم',
      members: [
        { id: 34, name: 'راشد علي', role: 'Captain' },
        { id: 35, name: 'عبدالله حسن', role: 'Member' },
        { id: 36, name: 'محمد سعيد', role: 'Member' },
        { id: 37, name: 'أحمد يوسف', role: 'Member' },
        { id: 38, name: 'علي محمد', role: 'Member' }
      ]
    },
    {
      id: 8,
      name: 'بني ياس',
      logo: 'https://via.placeholder.com/150x150/16a34a/ffffff?text=بني+ياس',
      description: 'نادي بني ياس - من الأندية المهمة في أبوظبي وله قاعدة جماهيرية قوية',
      members: [
        { id: 39, name: 'حسن راشد', role: 'Captain' },
        { id: 40, name: 'سعيد أحمد', role: 'Member' },
        { id: 41, name: 'عبدالله علي', role: 'Member' },
        { id: 42, name: 'محمد حسن', role: 'Member' },
        { id: 43, name: 'يوسف سعيد', role: 'Member' },
        { id: 44, name: 'أحمد عبدالله', role: 'Member' }
      ]
    },
    {
      id: 9,
      name: 'خورفكان',
      logo: 'https://via.placeholder.com/150x150/9333ea/ffffff?text=خورفكان',
      description: 'نادي خورفكان - من الأندية المهمة في إمارة الشارقة وله تاريخ عريق',
      members: [
        { id: 45, name: 'علي محمد', role: 'Captain' },
        { id: 46, name: 'أحمد حسن', role: 'Member' },
        { id: 47, name: 'محمد علي', role: 'Member' },
        { id: 48, name: 'يوسف أحمد', role: 'Member' }
      ]
    },
    {
      id: 10,
      name: 'الاتحاد',
      logo: 'https://via.placeholder.com/150x150/c2410c/ffffff?text=الاتحاد',
      description: 'نادي الاتحاد - من الأندية المهمة في كلباء وله دور بارز في تطوير كرة القدم المحلية',
      members: [
        { id: 49, name: 'سعيد يوسف', role: 'Captain' },
        { id: 50, name: 'عبدالله محمد', role: 'Member' },
        { id: 51, name: 'حسن أحمد', role: 'Member' },
        { id: 52, name: 'علي سعيد', role: 'Member' },
        { id: 53, name: 'محمد عبدالله', role: 'Member' }
      ]
    },
    {
      id: 11,
      name: 'الإمارات',
      logo: 'https://via.placeholder.com/150x150/0d9488/ffffff?text=الإمارات',
      description: 'نادي الإمارات - من الأندية المهمة في رأس الخيمة وله تاريخ مشرف',
      members: [
        { id: 54, name: 'أحمد علي', role: 'Captain' },
        { id: 55, name: 'محمد حسن', role: 'Member' },
        { id: 56, name: 'يوسف محمد', role: 'Member' },
        { id: 57, name: 'علي أحمد', role: 'Member' },
        { id: 58, name: 'سعيد يوسف', role: 'Member' },
        { id: 59, name: 'عبدالله علي', role: 'Member' }
      ]
    },
    {
      id: 12,
      name: 'الشباب',
      logo: 'https://via.placeholder.com/150x150/be123c/ffffff?text=الشباب',
      description: 'نادي الشباب - من الأندية المهمة في دبي وله تاريخ عريق في كرة القدم',
      members: [
        { id: 60, name: 'محمد سعيد', role: 'Captain' },
        { id: 61, name: 'علي أحمد', role: 'Member' },
        { id: 62, name: 'يوسف محمد', role: 'Member' },
        { id: 63, name: 'أحمد علي', role: 'Member' },
        { id: 64, name: 'حسن يوسف', role: 'Member' },
        { id: 65, name: 'سعيد محمد', role: 'Member' },
        { id: 66, name: 'عبدالله أحمد', role: 'Member' }
      ]
    }
  ];

  return (
    <div className="matches-page">
      <div className="page-header">
        <h1 className="page-title">🏆 المباريات والفرق المشاركة</h1>
        <p className="page-subtitle">عرض جميع الفرق المشاركة مع قوائم اللاعبين</p>
      </div>

      <TeamsWithPlayersGrid 
        teams={teams} 
        onTeamClick={showTeamDetails}
      />

      {/* Modal */}
      {selectedTeam && (
        <TeamDetailsModal 
          team={selectedTeam} 
          onClose={() => setSelectedTeam(null)} 
        />
      )}
    </div>
  );
}
