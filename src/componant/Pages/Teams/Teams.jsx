import React, { useState } from 'react'
import './Teams.css'

// مكون عرض تفاصيل الفريق
const مكون_تفاصيل_الفريق = ({ فريق, إغلاق }) => {
  if (!فريق) return null;
  
  return (
    <div className="modal-overlay" onClick={إغلاق}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <img src={فريق.logo} alt={فريق.name} className="modal-team-logo" />
          <h2>{فريق.name}</h2>
          <button className="close-button" onClick={إغلاق}>×</button>
        </div>
        <div className="modal-body">
          <div className="team-stats">
            <div className="stat-item">
              <span className="stat-label">النقاط الحالية</span>
              <span className="stat-value">{فريق.score}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">المركز</span>
              <span className="stat-value">{فريق.position || '-'}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">عدد المباريات</span>
              <span className="stat-value">{فريق.matches || 0}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">الأهداف</span>
              <span className="stat-value">{فريق.goals || 0}</span>
            </div>
          </div>
          <div className="team-info-details">
            <h3>معلومات النادي</h3>
            <p><strong>تاريخ التأسيس:</strong> {فريق.established || '-'}</p>
            <p><strong>الملعب:</strong> {فريق.stadium || '-'}</p>
            <p><strong>المدرب:</strong> {فريق.coach || '-'}</p>
            <p><strong>الدوري:</strong> دوري أدنوك للمحترفين</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// مكون البحث والفلترة
const مكون_البحث_والفلترة = ({ مصطلح_البحث, تعيين_مصطلح_البحث, ترتيب_حسب, تعيين_الترتيب }) => {
  return (
    <div className="search-filter-container">
      <div className="search-box">
        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="البحث عن فريق..."
          value={مصطلح_البحث}
          onChange={(e) => تعيين_مصطلح_البحث(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="filter-box">
        <select 
          value={ترتيب_حسب} 
          onChange={(e) => تعيين_الترتيب(e.target.value)}
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

// مكون عرض جميع الفرق بطريقة مبتكرة
const مكون_عرض_جميع_الفرق = ({ فرق, النقر_على_الفريق }) => {
  const [مصطلح_البحث, setمصطلح_البحث] = useState('');
  const [ترتيب_حسب, setترتيب_حسب] = useState('name');
  const [الفريق_المحوم, setالفريق_المحوم] = useState(null);

  // فلترة وبحث الفرق
  const الفرق_المصفاة = فرق.filter(فريق =>
    فريق.name.toLowerCase().includes(مصطلح_البحث.toLowerCase())
  );

  // ترتيب الفرق
  const الفرق_المرتبة = [...الفرق_المصفاة].sort((a, b) => {
    switch (ترتيب_حسب) {
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
  const أفضل_الفرق = [...فرق].sort((a, b) => b.score - a.score).slice(0, 3);

  return (
    <div className="all-teams-container">
      {/* عرض أفضل 3 فرق */}
      {مصطلح_البحث === '' && ترتيب_حسب === 'name' && (
        <div className="top-teams-section">
          <h2 className="section-title">🏆 أفضل 3 فرق</h2>
          <div className="top-teams-grid">
            {أفضل_الفرق.map((فريق, index) => (
              <div 
                key={فريق.id} 
                className={`top-team-card rank-${index + 1}`}
                onClick={() => النقر_على_الفريق(فريق)}
              >
                <div className="rank-badge">{index + 1}</div>
                <img src={فريق.logo} alt={فريق.name} className="top-team-logo" />
                <h3 className="top-team-name">{فريق.name}</h3>
                <div className="top-team-score">{فريق.score} نقطة</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <مكون_البحث_والفلترة 
        مصطلح_البحث={مصطلح_البحث}
        تعيين_مصطلح_البحث={setمصطلح_البحث}
        ترتيب_حسب={ترتيب_حسب}
        تعيين_الترتيب={setترتيب_حسب}
      />
      
      {الفرق_المرتبة.length === 0 ? (
        <div className="no-results">
          <svg className="no-results-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.08 2.33" />
          </svg>
          <h3>لا توجد نتائج</h3>
          <p>جرب البحث بكلمات مختلفة</p>
        </div>
      ) : (
        <div className="teams-grid">
          {الفرق_المرتبة.map((فريق, index) => (
            <div 
              key={فريق.id || index} 
              className={`team-card ${الفريق_المحوم === فريق.id ? 'hovered' : ''}`}
              onClick={() => النقر_على_الفريق(فريق)}
              onMouseEnter={() => setالفريق_المحوم(فريق.id)}
              onMouseLeave={() => setالفريق_المحوم(null)}
            >
              <div className="team-card-header">
                <div className="team-logo-container">
                  <img src={فريق.logo} alt={فريق.name} className="team-logo" />
                  <div className="team-score-badge">
                    {فريق.score}
                  </div>
                </div>
                <div className="team-info">
                  <h3 className="team-name">{فريق.name}</h3>
                  <div className="team-meta">
                    <span className="team-position">المركز: {فريق.position || 'غير محدد'}</span>
                    <span className="team-matches">المباريات: {فريق.matches || 0}</span>
                  </div>
                </div>
              </div>
              <div className="team-card-footer">
                <div className="team-stats-mini">
                  <div className="stat-mini">
                    <span className="stat-label-mini">الأهداف</span>
                    <span className="stat-value-mini">{فريق.goals || 0}</span>
                  </div>
                  <div className="stat-mini">
                    <span className="stat-label-mini">النقاط</span>
                    <span className="stat-value-mini">{فريق.score}</span>
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
          <span className="summary-value">{فرق.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">الفرق المعروضة</span>
          <span className="summary-value">{الفرق_المرتبة.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">أعلى نقاط</span>
          <span className="summary-value">{Math.max(...فرق.map(t => t.score))}</span>
        </div>
      </div>
    </div>
  );
};

export default function Teams() {
  const [الأيام_المفتوحة, setالأيام_المفتوحة] = useState({})
  const [الفريق_المحدد, setالفريق_المحدد] = useState(null)
  const [وضع_العرض, setوضع_العرض] = useState('all') // 'all' أو 'groups'

  const تبديل_اليوم = (مؤشر_اليوم) => {
    setالأيام_المفتوحة(prev => ({
      ...prev,
      [مؤشر_اليوم]: !prev[مؤشر_اليوم]
    }))
  }

  const عرض_تفاصيل_الفريق = (فريق) => {
    setالفريق_المحدد({
      ...فريق,
      established: "1968",
      stadium: "استاد هزاع بن زايد",
      coach: "هيرنان كريسبو",
      position: "3",
      matches: "15",
      goals: "25"
    });
  };

  // تجميع جميع الفرق من جميع الأيام والمجموعات
  const الحصول_على_جميع_الفرق = () => {
    const جميع_الفرق = [];
    بيانات_الفرق.forEach(يوم => {
      يوم.groups.forEach(مجموعة => {
        مجموعة.teams.forEach(فريق => {
          if (!جميع_الفرق.find(t => t.name === فريق.name)) {
            جميع_الفرق.push({
              ...فريق,
              id: جميع_الفرق.length + 1,
              position: Math.floor(Math.random() * 12) + 1,
              matches: Math.floor(Math.random() * 20) + 5,
              goals: Math.floor(Math.random() * 30) + 10
            });
          }
        });
      });
    });
    return جميع_الفرق;
  };

  // بيانات الفرق المنظمة حسب الأيام والمجموعات
  const بيانات_الفرق = [
    {
      date: "الاثنين 3 مارس 2025",
      groups: [
        {
          name: "المجموعة الأولى",
          column: "أ",
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
          name: "المجموعة الأولى",
          column: "ب",
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
          name: "المجموعة الثانية",
          column: "ج",
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
      date: "الثلاثاء 4 مارس 2025",
      groups: [
        {
          name: "المجموعة الثالثة",
          column: "أ",
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
          name: "المجموعة الثالثة",
          column: "ب",
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
          name: "المجموعة الرابعة",
          column: "ج",
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
            className={`toggle-btn ${وضع_العرض === 'all' ? 'active' : ''}`}
            onClick={() => setوضع_العرض('all')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            عرض جميع الفرق
          </button>
          <button 
            className={`toggle-btn ${وضع_العرض === 'groups' ? 'active' : ''}`}
            onClick={() => setوضع_العرض('groups')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            عرض المجموعات
          </button>
        </div>
      </div>

      {/* عرض جميع الفرق */}
      {وضع_العرض === 'all' && (
        <مكون_عرض_جميع_الفرق 
          فرق={الحصول_على_جميع_الفرق()} 
          النقر_على_الفريق={عرض_تفاصيل_الفريق}
        />
      )}

      {/* عرض المجموعات */}
      {وضع_العرض === 'groups' && (
        <div className="groups-container">
          {بيانات_الفرق.map((يوم, يوم_مؤشر) => (
            <div key={يوم_مؤشر} className="day-section">
              <div className="day-header" onClick={() => تبديل_اليوم(يوم_مؤشر)}>
                <h2 className="day-title">{يوم.date}</h2>
                <svg 
                  className={`toggle-icon ${الأيام_المفتوحة[يوم_مؤشر] ? 'rotated' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {الأيام_المفتوحة[يوم_مؤشر] && (
                <div className="groups-grid">
                  {يوم.groups.map((مجموعة, مجموعة_مؤشر) => (
                    <div key={مجموعة_مؤشر} className="group-card">
                      <div className="group-header">
                        <h3 className="group-name">{مجموعة.name}</h3>
                        <span className="group-column">المجموعة {مجموعة.column}</span>
                      </div>
                      <div className="teams-list">
                        {مجموعة.teams.map((فريق, فريق_مؤشر) => (
                          <div 
                            key={فريق_مؤشر} 
                            className="team-item"
                            onClick={() => عرض_تفاصيل_الفريق(فريق)}
                          >
                            <img src={فريق.logo} alt={فريق.name} className="team-logo-small" />
                            <div className="team-info-small">
                              <h4 className="team-name-small">{فريق.name}</h4>
                              <span className="team-score-small">{فريق.score} نقطة</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* نافذة تفاصيل الفريق */}
      {الفريق_المحدد && (
        <مكون_تفاصيل_الفريق 
          فريق={الفريق_المحدد} 
          إغلاق={() => setالفريق_المحدد(null)} 
        />
      )}
    </div>
  );
}
