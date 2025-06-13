import React, { useState } from "react";
import "./Login.css";
import logo from "../../../Images/Logo.png";

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    academyName: "",
    country: "",
    managerName: "",
    email: "",
    phone: "",
    contactPhone: "",
    logoUrl: "",
    under14: false,
    under16: false,
    under18: false,
    certified: false,
    password: "",
    confirmPassword: ""
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Registration data:", registerForm);
    setShowRegister(false);
    setRegisterForm({
      academyName: "",
      country: "",
      managerName: "",
      email: "",
      phone: "",
      contactPhone: "",
      logoUrl: "",
      under14: false,
      under16: false,
      under18: false,
      certified: false,
      password: "",
      confirmPassword: ""
    });
  };

  const handleInputChange = (field, value) => {
    setRegisterForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-logo">
          <img src={logo} alt="Quattro Logo" />
        </div>
        <h1 className="login-title">تسجيل الدخول</h1>
        <p className="login-subtitle">قم بتسجيل الدخول للوصول إلى لوحة التحكم</p>
        <form className="login-form">
          <label className="login-label" htmlFor="email">البريد الإلكتروني</label>
          <input className="login-input" type="email" id="email" placeholder="example@email.com" />
          <label className="login-label" htmlFor="password">كلمة المرور</label>
          <input className="login-input" type="password" id="password" placeholder="••••••••" />
          <button className="login-btn" type="submit">
            <span className="login-btn-icon">→</span> تسجيل الدخول
          </button>
        </form>
        <button className="register-btn" type="button" onClick={() => setShowRegister(true)}>
          <span className="register-btn-icon">✚</span> تسجيل أكاديمية جديدة
        </button>
      </div>

      {/* Registration Modal */}
      {showRegister && (
        <div className="register-modal-overlay" onClick={() => setShowRegister(false)}>
          <div className="register-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="register-modal-header">
              <h2>تسجيل أكاديمية جديدة</h2>
              <button className="register-close-btn" onClick={() => setShowRegister(false)}>×</button>
            </div>
            
            <form className="register-form" onSubmit={handleRegisterSubmit}>
              <div className="register-form-section">
                <h3>معلومات الأكاديمية الأساسية</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>اسم الأكاديمية *</label>
                    <input
                      type="text"
                      value={registerForm.academyName}
                      onChange={(e) => handleInputChange('academyName', e.target.value)}
                      placeholder="أدخل اسم الأكاديمية"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>الدولة *</label>
                    <input
                      type="text"
                      value={registerForm.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      placeholder="أدخل الدولة"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>اسم المنسق</label>
                    <input
                      type="text"
                      value={registerForm.managerName}
                      onChange={(e) => handleInputChange('managerName', e.target.value)}
                      placeholder="أدخل اسم المنسق"
                    />
                  </div>
                  <div className="form-group">
                    <label>رابط الشعار</label>
                    <input
                      type="url"
                      value={registerForm.logoUrl}
                      onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                      placeholder="رابط صورة الشعار"
                    />
                  </div>
                </div>
              </div>

              <div className="register-form-section">
                <h3>معلومات الاتصال</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>البريد الإلكتروني *</label>
                    <input
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="example@academy.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>رقم الهاتف</label>
                    <input
                      type="tel"
                      value={registerForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="رقم الهاتف"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>رقم الاتصال الإضافي</label>
                    <input
                      type="tel"
                      value={registerForm.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      placeholder="رقم اتصال إضافي"
                    />
                  </div>
                </div>
              </div>

              <div className="register-form-section">
                <h3>الفئات المشاركة</h3>
                <div className="categories-grid">
                  <label className="category-checkbox">
                    <input
                      type="checkbox"
                      checked={registerForm.under14}
                      onChange={(e) => handleInputChange('under14', e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    تحت 14 سنة
                  </label>
                  <label className="category-checkbox">
                    <input
                      type="checkbox"
                      checked={registerForm.under16}
                      onChange={(e) => handleInputChange('under16', e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    تحت 16 سنة
                  </label>
                  <label className="category-checkbox">
                    <input
                      type="checkbox"
                      checked={registerForm.under18}
                      onChange={(e) => handleInputChange('under18', e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    تحت 18 سنة
                  </label>
                  <label className="category-checkbox">
                    <input
                      type="checkbox"
                      checked={registerForm.certified}
                      onChange={(e) => handleInputChange('certified', e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    أكاديمية معتمدة
                  </label>
                </div>
              </div>

              <div className="register-form-section">
                <h3>كلمة المرور</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>كلمة المرور *</label>
                    <input
                      type="password"
                      value={registerForm.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="كلمة المرور"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>تأكيد كلمة المرور *</label>
                    <input
                      type="password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="تأكيد كلمة المرور"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="register-form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowRegister(false)}>
                  إلغاء
                </button>
                <button type="submit" className="submit-btn">
                  تسجيل الأكاديمية
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
