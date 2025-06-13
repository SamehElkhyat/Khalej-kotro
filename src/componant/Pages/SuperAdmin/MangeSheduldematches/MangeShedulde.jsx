import React from 'react'
import './MangeShedulde.css';

const MangeShedulde = () => {
  return (
    <div className="schedule-page" dir="rtl">
      {/* Header */}
      <div className="schedule-header">
        <div>
          <h2 className="schedule-title">
            <span role="img" aria-label="cup">🏆</span> إدارة المباريات
          </h2>
          <p className="schedule-desc">عرض وإدارة جميع مباريات البطولة</p>
        </div>
        <div className="schedule-filters">
          <button className="refresh-btn">تحديث <span className="refresh-icon">⟳</span></button>
          <select className="filter-select">
            <option>جميع الحالات</option>
          </select>
          <select className="filter-select">
            <option>جميع الفئات</option>
          </select>
        </div>
      </div>
      {/* Matches List */}
      <div className="matches-list">
        <div className="match-card match-card--active">
          <div className="match-status">
            <span className="status-badge status-badge--active">جارية</span>
          </div>
          <div className="match-info">
            <div className="match-title">ttt vs mohamed</div>
            <div className="match-details">
              <span className="match-location">
                <span className="icon">📍</span> الملعب الرئيسي - البحرين
              </span>
              <span className="match-time">
                <span className="icon">⏰</span> 14:00
              </span>
              <span className="match-date">
                <span className="icon">📅</span> الخميس، 26 يونيو 2025
              </span>
              <span className="match-category">
                <span className="icon">👥</span> الفئة:
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MangeShedulde