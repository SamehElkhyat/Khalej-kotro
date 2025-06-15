import React, { useEffect, useState } from "react";
import "./Players.css";
import { useFormik } from "formik";
import axios from "axios";

const positions = [
  "مهاجم",
  "وسط",
  "مدافع",
  "حارس مرمى",
  "ظهير أيسر",
  "ظهير أيمن",
  "جناح",
  "صانع ألعاب",
  "اختر المركز",
];

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);

  const allPlayers = async () => {
    try {
      const response = await axios.get("https://sports.runasp.net/api/Get-Players-By-Academy", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPlayers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addPlayer = async () => {
    console.log(addPlayerFormik.values);
    try {
      const response = await axios.post(
        "https://sports.runasp.net/api/Add-Players",
        addPlayerFormik.values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      allPlayers();
      onCloseAdd();
    } catch (error) {
      console.log(error);
    }
  };

  const editPlayer = async (values) => {
    try {
      const response = await axios.post(
        `https://sports.runasp.net/api/Update-Player/${editingPlayer.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      allPlayers();
      onCloseEdit();
    } catch (error) {
      console.log(error);
    }
  };

  const deletePlayer = async (id) => {
    try {
      const response = await axios.delete(
        `https://sports.runasp.net/api/Delete-Player/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      allPlayers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (player) => {
    setEditingPlayer(player);
    // Pre-fill the edit form with player data
    editPlayerFormik.setValues({
      pLayerName: player.pLayerName || "",
      academyName: player.academyName || "",
      category: player.category || "",
      possition: player.possition || "",
      numberShirt: player.numberShirt || "",
      goals: player.goals || "",
      yellowCards: player.yellowCards || "",
      redCards: player.redCards || "",
      nationality: player.nationality || "",
      birthDate: player.birthDate || "",
    });
    setShowEdit(true);
  };

  const onCloseAdd = () => {
    setShowAdd(false);
    addPlayerFormik.resetForm();
  };

  const onCloseEdit = () => {
    setShowEdit(false);
    setEditingPlayer(null);
    editPlayerFormik.resetForm();
  };

  useEffect(() => {
    allPlayers();
  }, []);

  const addPlayerFormik = useFormik({
    initialValues: {
      pLayerName: "",
      academyName: "",
      category: "",
      possition: "",
      numberShirt: "",
      goals: "",
      yellowCards: "",
      redCards: "",
      nationality: "",
      birthDate: "",
    },
    onSubmit: addPlayer,
  });

  const editPlayerFormik = useFormik({
    initialValues: {
      pLayerName: "",
      academyName: "",
      category: "",
      possition: "",
      numberShirt: "",
      goals: "",
      yellowCards: "",
      redCards: "",
      nationality: "",
      birthDate: "",
    },
    onSubmit: editPlayer,
  });

  return (
    <div className="players-page">
      {/* زر إضافة لاعب */}
      <div className="header-bar">
        <button className="add-player-btn" onClick={() => setShowAdd(true)}>
          إضافة لاعب +
        </button>
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
      {showAdd && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header bg-[#ef4343]">
              <span className="text-white bg-[#ef4343] p-2 rounded-md">إضافة لاعب جديد</span>
              <button className="close-btn" onClick={() => setShowAdd(false)}>
                ×
              </button>
            </div>
              <form className="edit-player-form" onSubmit={addPlayerFormik.handleSubmit}>
              <div className="form-row">
                <input
                  className={`form-input ${
                    !addPlayerFormik.values.pLayerName ? "input-error" : ""
                  }`}
                  type="text"
                  placeholder="اسم اللاعب"
                  value={addPlayerFormik.values.pLayerName}
                  onChange={(e) =>
                    addPlayerFormik.setFieldValue("pLayerName", e.target.value)
                  }
                  required
                />
                <label>اسم اللاعب</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="text"
                  placeholder="الأكاديمية"
                  value={addPlayerFormik.values.academyName}
                  onChange={(e) =>
                    addPlayerFormik.setFieldValue("academyName", e.target.value)
                  }
                  required
                />
                <label>الأكاديمية</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="text"
                  placeholder="الفئة"
                  value={addPlayerFormik.values.category}
                  onChange={(e) =>
                    addPlayerFormik.setFieldValue("category", e.target.value)
                  }
                  required
                />
                <label>الفئة</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="date"
                  value={addPlayerFormik.values.birthDate}
                  onChange={(e) =>
                    addPlayerFormik.setFieldValue("birthDate", e.target.value)
                  }
                />
                <label>تاريخ الميلاد</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="text"
                  placeholder="المركز"
                  value={addPlayerFormik.values.possition}
                  onChange={(e) =>
                    addPlayerFormik.setFieldValue("possition", e.target.value)
                  }
                  required
                />

                <label>المركز</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="number"
                  placeholder="رقم القميص"
                  value={addPlayerFormik.values.numberShirt}
                  onChange={(e) =>
                    addPlayerFormik.setFieldValue("numberShirt", e.target.value)
                  }
                  required
                />
                <label>رقم القميص</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="number"
                  placeholder="الأهداف"
                  value={addPlayerFormik.values.goals}
                  onChange={(e) =>
                    addPlayerFormik.setFieldValue("goals", e.target.value)
                  }
                />
                <label>الأهداف</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="number"
                  placeholder="البطاقات الصفراء"
                  value={addPlayerFormik.values.yellowCards}
                  onChange={(e) =>
                    addPlayerFormik.setFieldValue("yellowCards", e.target.value)
                  }
                />
                <label>البطاقات الصفراء</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="number"
                  placeholder="البطاقات الحمراء"
                  value={addPlayerFormik.values.redCards}
                  onChange={(e) =>
                    addPlayerFormik.setFieldValue("redCards", e.target.value)
                  }
                />
                <label>البطاقات الحمراء</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="text"
                  placeholder="الجنسية"
                  value={addPlayerFormik.values.nationality}
                  onChange={(e) =>
                    addPlayerFormik.setFieldValue("nationality", e.target.value)
                  }
                />
                <label>الجنسية</label>
              </div>
              <button className="update-btn" type="submit">
                إضافة
              </button>
            </form>
          </div>
        </div>
      )}

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
                <td>{player.pLayerName}</td>
                <td>{player.academyName}</td>
                <td>{player.category}</td>
                <td>{player.possition}</td>
                <td>{player.numberShirt}</td>
                <td>
                  <span className="yellow-badge">{player.goals}</span>
                </td>
                <td>
                  <span className="yellow-badge">{player.yellowCards}</span>
                </td>
                <td>
                  <span className="red-badge">{player.redCards}</span>
                </td>
                <td>
                <button className="action-btn delete" onClick={() => deletePlayer(player.id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                  <button className="action-btn edit" onClick={() => handleEditClick(player)}>
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* نافذة التعديل */}
      {showEdit && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <span>تعديل بيانات لاعب</span>
              <button className="close-btn" onClick={onCloseEdit}>
                ×
              </button>
            </div>
            <form className="edit-player-form" onSubmit={editPlayerFormik.handleSubmit}>
              <div className="form-row">
                <input
                  className={`form-input ${!editPlayerFormik.values.pLayerName ? "input-error" : ""}`}
                  type="text"
                  placeholder="اسم اللاعب"
                  value={editPlayerFormik.values.pLayerName}
                  onChange={(e) =>
                    editPlayerFormik.setFieldValue("pLayerName", e.target.value)
                  }
                  required
                />
                <label>اسم اللاعب</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="text"
                  placeholder="الأكاديمية"
                  value={editPlayerFormik.values.academyName}
                  onChange={(e) =>
                    editPlayerFormik.setFieldValue("academyName", e.target.value)
                  }
                  required
                />
                <label>الأكاديمية</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="text"
                  placeholder="الفئة"
                  value={editPlayerFormik.values.category}
                  onChange={(e) =>
                    editPlayerFormik.setFieldValue("category", e.target.value)
                  }
                  required
                />
                <label>الفئة</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="date"
                  value={editPlayerFormik.values.birthDate}
                  onChange={(e) =>
                    editPlayerFormik.setFieldValue("birthDate", e.target.value)
                  }
                />
                <label>تاريخ الميلاد</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="text"
                  placeholder="المركز"
                  value={editPlayerFormik.values.possition}
                  onChange={(e) =>
                    editPlayerFormik.setFieldValue("possition", e.target.value)
                  }
                  required
                />
                <label>المركز</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="number"
                  placeholder="رقم القميص"
                  value={editPlayerFormik.values.numberShirt}
                  onChange={(e) =>
                    editPlayerFormik.setFieldValue("numberShirt", e.target.value)
                  }
                  required
                />
                <label>رقم القميص</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="number"
                  placeholder="الأهداف"
                  value={editPlayerFormik.values.goals}
                  onChange={(e) =>
                    editPlayerFormik.setFieldValue("goals", e.target.value)
                  }
                />
                <label>الأهداف</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="number"
                  placeholder="البطاقات الصفراء"
                  value={editPlayerFormik.values.yellowCards}
                  onChange={(e) =>
                    editPlayerFormik.setFieldValue("yellowCards", e.target.value)
                  }
                />
                <label>البطاقات الصفراء</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="number"
                  placeholder="البطاقات الحمراء"
                  value={editPlayerFormik.values.redCards}
                  onChange={(e) =>
                    editPlayerFormik.setFieldValue("redCards", e.target.value)
                  }
                />
                <label>البطاقات الحمراء</label>
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="text"
                  placeholder="الجنسية"
                  value={editPlayerFormik.values.nationality}
                  onChange={(e) =>
                    editPlayerFormik.setFieldValue("nationality", e.target.value)
                  }
                />
                <label>الجنسية</label>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <button
                  type="button"
                  className="update-btn"
                  style={{ background: "#eee", color: "#222" }}
                  onClick={onCloseEdit}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="update-btn"
                  style={{ background: "#2563eb" }}
                >
                  تعديل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة إضافة لاعب جديد */}
    </div>
  );
};

export default Players;