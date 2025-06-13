import React, { useState } from "react";
import "./Acadimics.css";

const academies = [
  {
    name: "موشفر",
    country: "Egypt",
    email: "yabloghagi@gmail.com",
    phone: "01114531437",
    status: "مكتملة",
  },
  {
    name: "اوتي",
    country: "Algeria",
    email: "chinounmohaj@gmail.com",
    phone: "0540923577",
    status: "في الانتظار",
  },
  {
    name: "888",
    country: "88",
    email: "g8@gmail.com",
    phone: "01151303980",
    status: "في الانتظار",
  },
  {
    name: "samehElkhayat",
    country: "Egypt",
    email: "ssalih292@gmail.com",
    phone: "01065369433",
    status: "في الانتظار",
  },
  {
    name: "اكاديمية العضو999999",
    country: "gf",
    email: "",
    phone: "",
    status: "في الانتظار",
  },
  {
    name: "موشفر",
    country: "Egypt",
    email: "yabloghagi@gmail.com",
    phone: "01114531437",
    status: "في الانتظار",
  },
  {
    name: "ghhg",
    country: "Algeria",
    email: "evasoft123@gmail.com",
    phone: "0657274307",
    status: "في الانتظار",
  },
  {
    name: "hjhjhj",
    country: "g'hghg",
    email: "",
    phone: "",
    status: "مكتملة",
  },
  {
    name: "ttt",
    country: "Canada",
    email: "",
    phone: "",
    status: "في الانتظار",
  },
  {
    name: "ttt",
    country: "ddd",
    email: "",
    phone: "",
    status: "مكتملة",
  },
  {
    name: "mohamed",
    country: "Algeria",
    email: "mabrouk@gmail.com",
    phone: "",
    status: "في الانتظار",
  },
];

const initialForm = {
  name: "",
  country: "",
  manager: "",
  email: "",
  phone: "",
  contact: "",
  logo: "",
  under14: false,
  under16: false,
  under18: false,
  certified: false,
};

const AddAcademyModal = ({ show, onClose, form, onChange, onSubmit }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <span style={{ color: "#2563eb" }}>إضافة أكاديمية جديدة</span>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form className="edit-player-form" onSubmit={onSubmit}>
          <div className="form-row">
            <input className="form-input" type="text" placeholder="اسم الأكاديمية" value={form.name} onChange={e => onChange({ ...form, name: e.target.value })} required />
            <label>اسم الأكاديمية</label>
          </div>
          <div className="form-row">
            <input className="form-input" type="text" placeholder="الدولة" value={form.country} onChange={e => onChange({ ...form, country: e.target.value })} required />
            <label>الدولة</label>
          </div>
          <div className="form-row">
            <input className="form-input" type="text" placeholder="المنسق" value={form.manager} onChange={e => onChange({ ...form, manager: e.target.value })} />
            <label>المنسق</label>
          </div>
          <div className="form-row">
            <input className="form-input" type="email" placeholder="البريد الإلكتروني" value={form.email} onChange={e => onChange({ ...form, email: e.target.value })} />
            <label>البريد الإلكتروني</label>
          </div>
          <div className="form-row">
            <input className="form-input" type="text" placeholder="رقم الهاتف" value={form.phone} onChange={e => onChange({ ...form, phone: e.target.value })} />
            <label>رقم الهاتف</label>
          </div>
          <div className="form-row">
            <input className="form-input" type="text" placeholder="رقم الاتصال" value={form.contact} onChange={e => onChange({ ...form, contact: e.target.value })} />
            <label>رقم الاتصال</label>
          </div>
          <div className="form-row">
            <input className="form-input" type="text" placeholder="رابط الشعار" value={form.logo} onChange={e => onChange({ ...form, logo: e.target.value })} />
            <label>رابط الشعار</label>
          </div>
          <div className="form-row" style={{ flexDirection: "column", alignItems: "flex-end", gap: 0 }}>
            <label style={{ marginBottom: 4 }}>الفئات المشاركة</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <label><input type="checkbox" checked={form.under14} onChange={e => onChange({ ...form, under14: e.target.checked })} /> تحت 14 سنة</label>
              <label><input type="checkbox" checked={form.under16} onChange={e => onChange({ ...form, under16: e.target.checked })} /> تحت 16 سنة</label>
              <label><input type="checkbox" checked={form.under18} onChange={e => onChange({ ...form, under18: e.target.checked })} /> تحت 18 سنة</label>
              <label><input type="checkbox" checked={form.certified} onChange={e => onChange({ ...form, certified: e.target.checked })} /> معتمدة</label>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button type="button" className="add-btn" style={{ background: "#eee", color: "#222" }} onClick={onClose}>إلغاء</button>
            <button type="submit" className="add-btn" style={{ background: "#2563eb" }}>إضافة</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Acadimics = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(initialForm);

  return (
    <div className="academies-page" dir="rtl">
      <div className="academies-header">
        <h2>إدارة الأكاديميات</h2>
        <p>يمكنك إضافة وتعديل وحذف الأكاديميات المشاركة في البطولة</p>
        <button className="add-btn" onClick={() => setShowAdd(true)}>إضافة أكاديمية جديدة</button>
      </div>
      <AddAcademyModal
        show={showAdd}
        onClose={() => setShowAdd(false)}
        form={form}
        onChange={setForm}
        onSubmit={e => { e.preventDefault(); setShowAdd(false); setForm(initialForm); }}
      />
      <div className="academies-list-card">
        <div className="academies-list-title">قائمة الأكاديميات <span>({academies.length})</span></div>
        <table className="academies-table">
          <thead>
            <tr>
              <th>العمليات</th>
              <th>الحالة</th>
              <th>الهاتف</th>
              <th>البريد الإلكتروني</th>
              <th>الدولة</th>
              <th>الاسم</th>
            </tr>
          </thead>
          <tbody>
            {academies.map((academy, idx) => (
              <tr key={idx} className={idx % 2 === 1 ? "row-alt" : ""}>
                <td>
                  <button className="action-btn delete"><i className="fas fa-trash"></i></button>
                  <button className="action-btn edit"><i className="fas fa-edit"></i></button>
                </td>
                <td>
                  <span className={
                    academy.status === "مكتملة"
                      ? "status status-done"
                      : "status status-pending"
                  }>
                    {academy.status}
                  </span>
                </td>
                <td>{academy.phone}</td>
                <td>{academy.email}</td>
                <td>{academy.country}</td>
                <td>{academy.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Acadimics;