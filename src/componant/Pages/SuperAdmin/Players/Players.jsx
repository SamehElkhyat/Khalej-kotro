import React, { useState } from "react";
import "./Players.css";

const initialPlayers = [
  {
    name: "vcfdfd",
    academy: "ttt",
    category: "تحت 16 سنة",
    position: "14",
    shirtNumber: "11",
    goals: "1",
    yellowCards: "1",
    redCards: "1",
    nationality: "",
    birthDate: "",
  },
  {
    name: "jhh",
    academy: "ttt",
    category: "تحت 16 سنة",
    position: "40",
    shirtNumber: "0",
    goals: "1",
    yellowCards: "1",
    redCards: "1",
    nationality: "",
    birthDate: "",
  },
  {
    name: "jjfj",
    academy: "hjhjhj",
    category: "ظهير أيسر",
    position: "5",
    shirtNumber: "2",
    goals: "0",
    yellowCards: "0",
    redCards: "0",
    nationality: "",
    birthDate: "",
  },
];

const positions = [
  "مهاجم", "وسط", "مدافع", "حارس مرمى", "ظهير أيسر", "ظهير أيمن", "جناح", "صانع ألعاب", "اختر المركز"
];

const EditPlayerModal = ({ show, onClose, player, onChange, onUpdate }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <span>تعديل بيانات لاعب</span>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form className="edit-player-form" onSubmit={onUpdate}>
          <div className="form-row">
            <input
              className={`form-input ${!player.name ? "input-error" : ""}`}
              type="text"
              placeholder="اسم اللاعب"
              value={player.name}
              onChange={e => onChange({ ...player, name: e.target.value })}
              required
            />
            <label>اسم اللاعب</label>
          </div>
          <div className="form-row">
            <select
              className="form-input"
              value={player.academy}
              onChange={e => onChange({ ...player, academy: e.target.value })}
            >
              <option value="">اختر الأكاديمية</option>
              <option value="ttt">ttt</option>
              <option value="hjhjhj">hjhjhj</option>
            </select>
            <label>الأكاديمية</label>
          </div>
          <div className="form-row">
            <select
              className="form-input"
              value={player.category}
              onChange={e => onChange({ ...player, category: e.target.value })}
            >
              <option value="">اختر الفئة</option>
              <option value="تحت 16 سنة">تحت 16 سنة</option>
              <option value="ظهير أيسر">ظهير أيسر</option>
            </select>
            <label>الفئة</label>
          </div>
          <div className="form-row">
            <input
              className="form-input"
              type="date"
              value={player.birthDate}
              onChange={e => onChange({ ...player, birthDate: e.target.value })}
            />
            <label>تاريخ الميلاد</label>
          </div>
          <div className="form-row">
            <select
              className="form-input"
              value={player.position}
              onChange={e => onChange({ ...player, position: e.target.value })}
            >
              <option value="">اختر المركز</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
            <label>المركز</label>
          </div>
          <div className="form-row">
            <input
              className="form-input"
              type="number"
              placeholder="رقم القميص"
              value={player.shirtNumber}
              onChange={e => onChange({ ...player, shirtNumber: e.target.value })}
            />
            <label>رقم القميص</label>
          </div>
          <div className="form-row">
            <input
              className="form-input"
              type="number"
              placeholder="الأهداف"
              value={player.goals}
              onChange={e => onChange({ ...player, goals: e.target.value })}
            />
            <label>الأهداف</label>
          </div>
          <div className="form-row">
            <input
              className="form-input"
              type="number"
              placeholder="البطاقات الصفراء"
              value={player.yellowCards}
              onChange={e => onChange({ ...player, yellowCards: e.target.value })}
            />
            <label>البطاقات الصفراء</label>
          </div>
          <div className="form-row">
            <input
              className="form-input"
              type="number"
              placeholder="البطاقات الحمراء"
              value={player.redCards}
              onChange={e => onChange({ ...player, redCards: e.target.value })}
            />
            <label>البطاقات الحمراء</label>
          </div>
          <div className="form-row">
            <input
              className="form-input"
              type="text"
              placeholder="الجنسية"
              value={player.nationality}
              onChange={e => onChange({ ...player, nationality: e.target.value })}
            />
            <label>الجنسية</label>
          </div>
          <button className="update-btn" type="submit">تحديث</button>
        </form>
      </div>
    </div>
  );
};

const Players = () => {
  const [players, setPlayers] = useState(initialPlayers);
  const [showEdit, setShowEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editPlayer, setEditPlayer] = useState({ ...initialPlayers[0] });

  const handleEdit = idx => {
    setEditIndex(idx);
    setEditPlayer({ ...players[idx] });
    setShowEdit(true);
  };

  const handleUpdate = e => {
    e.preventDefault();
    const updated = [...players];
    updated[editIndex] = { ...editPlayer };
    setPlayers(updated);
    setShowEdit(false);
  };

  return (
    <div className="players-page">
      {/* زر إضافة لاعب */}
      <div className="header-bar">
        <button className="add-player-btn">إضافة لاعب +</button>
      </div>

      {/* الفلاتر وحقل البحث */}
      <div className="filters-bar">
        <select className="filter-select">
          <option>جميع الأكاديميات</option>
        </select>
        <select className="filter-select">
          <option>جميع الفئات</option>
        </select>
        <select className="filter-select">
          <option>تصفية حسب الأكاديمية</option>
        </select>
        <select className="filter-select">
          <option>تصفية حسب الفئة</option>
        </select>
        <input className="search-input" placeholder="ابحث باسم اللاعب" />
      </div>

      {/* جدول اللاعبين */}
      <div className="players-table-container">
        <table className="players-table">
          <thead>
            <tr>
              <th>اسم اللاعب</th>
              <th>الأكاديمية</th>
              <th>الفئة</th>
              <th>المركز</th>
              <th>رقم القميص</th>
              <th>الأهداف</th>
              <th>البطاقات الصفراء</th>
              <th>البطاقات الحمراء</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, idx) => (
              <tr key={idx}>
                <td>{player.name}</td>
                <td>{player.academy}</td>
                <td>{player.category}</td>
                <td>{player.position}</td>
                <td>{player.shirtNumber}</td>
                <td><span className="yellow-badge">{player.goals}</span></td>
                <td><span className="yellow-badge">{player.yellowCards}</span></td>
                <td><span className="red-badge">{player.redCards}</span></td>
                <td>
                  <button className="action-btn delete">🗑️</button>
                  <button className="action-btn edit" onClick={() => handleEdit(idx)}>✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* نافذة التعديل */}
      <EditPlayerModal
        show={showEdit}
        onClose={() => setShowEdit(false)}
        player={editPlayer}
        onChange={setEditPlayer}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default Players;
