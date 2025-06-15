'use client'
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import logo from "../../../Images/Logo.png";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);

  // Validation schema for registration form
  const registerValidationSchema = Yup.object({
    academyName: Yup.string()
      .min(2, "اسم الأكاديمية يجب أن يكون على الأقل حرفين")
      .required("اسم الأكاديمية مطلوب"),
    academyEmail: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),
    academyPhone: Yup.string().matches(
      /^[0-9+\-\s()]+$/,
      "رقم الهاتف غير صحيح"
    ),
    academyCity: Yup.string()
      .min(2, "اسم المدينة يجب أن يكون على الأقل حرفين")
      .required("المدينة مطلوبة"),
    academyCountry: Yup.string()
      .min(2, "اسم الدولة يجب أن يكون على الأقل حرفين")
      .required("الدولة مطلوبة"),
    academyPassword: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف")
      .required("كلمة المرور مطلوبة"),
    logoURL: Yup.string().url("رابط الشعار غير صحيح"),
    coordinator: Yup.string().min(2, "اسم المنسق يجب أن يكون على الأقل حرفين"),
  });

  // Formik hook for registration form
  const registerFormik = useFormik({
    initialValues: {
      academyName: "",
      academyEmail: "",
      academyPhone: "",
      academyCity: "",
      academyCountry: "",
      academyPassword: "",
      logoURL: "",
      coordinator: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      axios.post("https://sports.runasp.net/api/Register-Academy", values)
        .then((response) => {
          resetForm();
          setShowRegister(false);
          toast.success("تم تسجيل الأكاديمية بنجاح!");
        })
        .catch((error) => {
          console.error("Registration error:", error);
          alert("حدث خطأ أثناء تسجيل الأكاديمية");
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const loginValidationSchema = Yup.object({
    academyEmail: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),
    academyPassword: Yup.string().required("كلمة المرور مطلوبة"),
  });

  const FormikLogin = useFormik({
    initialValues: {
      academyEmail: "",
      academyPassword: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      axios.post("https://sports.runasp.net/api/Login-Academy", values)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("token", response.data);
            window.location.href = "/";
          }
          resetForm();
          setShowRegister(false);
          toast.success("تم تسجيل الأكاديمية بنجاح!");
        })
        .catch((error) => {
          console.error("Registration error:", error);
          alert("حدث خطأ أثناء تسجيل الأكاديمية");
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-logo">
          <img src={logo} alt="Quattro Logo" />
        </div>
        <h1 className="login-title">تسجيل الدخول</h1>
        <p className="login-subtitle">
          قم بتسجيل الدخول للوصول إلى لوحة التحكم
        </p>
        <form className="login-form" onSubmit={FormikLogin.handleSubmit}>
          <label className="login-label" htmlFor="email">
            البريد الإلكتروني
          </label>
          <input
            className="login-input"
            type="email"
            id="academyEmail"
            placeholder="example@email.com"
            name="academyEmail"
            value={FormikLogin.values.academyEmail}
            onChange={FormikLogin.handleChange}
            onBlur={FormikLogin.handleBlur}
          />
          <label className="login-label" htmlFor="password">
            كلمة المرور
          </label>
          <input
            className="login-input"
            type="password"
            id="academyPassword"
            placeholder="••••••••"
            name="academyPassword"
            value={FormikLogin.values.academyPassword}
            onChange={FormikLogin.handleChange}
            onBlur={FormikLogin.handleBlur}
          />
          <button className="login-btn" type="submit">
            <i className="fas fa-sign-in-alt login-btn-icon"></i> تسجيل الدخول
          </button>
        </form>
        <button
          className="register-btn"
          type="button"
          onClick={() => setShowRegister(true)}
        >
          <i className="fas fa-plus register-btn-icon"></i> تسجيل أكاديمية جديدة
        </button>
      </div>

      {/* Registration Modal */}
      {showRegister && (
        <div
          className="register-modal-overlay"
          onClick={() => setShowRegister(false)}
        >
          <div
            className="register-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="register-modal-header">
              <h2>تسجيل أكاديمية جديدة</h2>
              <button
                className="register-close-btn"
                onClick={() => setShowRegister(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form
              className="register-form"
              onSubmit={registerFormik.handleSubmit}
            >
              <div className="register-form-section">
                <h3><i className="fas fa-building"></i> معلومات الأكاديمية الأساسية</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>اسم الأكاديمية *</label>
                    <input
                      type="text"
                      name="academyName"
                      value={registerFormik.values.academyName}
                      onChange={registerFormik.handleChange}
                      onBlur={registerFormik.handleBlur}
                      placeholder="أدخل اسم الأكاديمية"
                      className={
                        registerFormik.touched.academyName &&
                        registerFormik.errors.academyName
                          ? "error"
                          : ""
                      }
                    />
                    {registerFormik.touched.academyName &&
                      registerFormik.errors.academyName && (
                        <div className="error-message">
                          {registerFormik.errors.academyName}
                        </div>
                      )}
                  </div>
                  <div className="form-group">
                    <label>الدولة *</label>
                    <input
                      type="text"
                      name="academyCountry"
                      value={registerFormik.values.academyCountry}
                      onChange={registerFormik.handleChange}
                      onBlur={registerFormik.handleBlur}
                      placeholder="أدخل الدولة"
                      className={
                        registerFormik.touched.academyCountry &&
                        registerFormik.errors.academyCountry
                          ? "error"
                          : ""
                      }
                    />
                    {registerFormik.touched.academyCountry &&
                      registerFormik.errors.academyCountry && (
                        <div className="error-message">
                          {registerFormik.errors.academyCountry}
                        </div>
                      )}
                  </div>
                  <div className="form-group">
                    <label>المدينه *</label>
                    <input
                      type="text"
                      name="academyCity"
                      value={registerFormik.values.academyCity}
                      onChange={registerFormik.handleChange}
                      onBlur={registerFormik.handleBlur}
                      placeholder="أدخل المدينه"
                      className={
                        registerFormik.touched.academyCity &&
                        registerFormik.errors.academyCity
                          ? "error"
                          : ""
                      }
                    />
                    {registerFormik.touched.academyCity &&
                      registerFormik.errors.academyCity && (
                        <div className="error-message">
                          {registerFormik.errors.academyCity}
                        </div>
                      )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>اسم المنسق</label>
                    <input
                      type="text"
                      name="coordinator"
                      value={registerFormik.values.coordinator}
                      onChange={registerFormik.handleChange}
                      onBlur={registerFormik.handleBlur}
                      placeholder="أدخل اسم المنسق"
                      className={
                        registerFormik.touched.coordinator &&
                        registerFormik.errors.coordinator
                          ? "error"
                          : ""
                      }
                    />
                    {registerFormik.touched.coordinator &&
                      registerFormik.errors.coordinator && (
                        <div className="error-message">
                          {registerFormik.errors.coordinator}
                        </div>
                      )}
                  </div>
                  <div className="form-group">
                    <label>رابط الشعار</label>
                    <input
                      type="url"
                      name="logoURL"
                      value={registerFormik.values.logoURL}
                      onChange={registerFormik.handleChange}
                      onBlur={registerFormik.handleBlur}
                      placeholder="رابط صورة الشعار"
                      className={
                        registerFormik.touched.logoURL &&
                        registerFormik.errors.logoURL
                          ? "error"
                          : ""
                      }
                    />
                    {registerFormik.touched.logoURL &&
                      registerFormik.errors.logoURL && (
                        <div className="error-message">
                          {registerFormik.errors.logoURL}
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <div className="register-form-section">
                <h3><i className="fas fa-phone-alt"></i> معلومات الاتصال</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>البريد الإلكتروني *</label>
                    <input
                      type="email"
                      name="academyEmail"
                      value={registerFormik.values.academyEmail}
                      onChange={registerFormik.handleChange}
                      onBlur={registerFormik.handleBlur}
                      placeholder="example@academy.com"
                      className={
                        registerFormik.touched.academyEmail &&
                        registerFormik.errors.academyEmail
                          ? "error"
                          : ""
                      }
                    />
                    {registerFormik.touched.academyEmail &&
                      registerFormik.errors.academyEmail && (
                        <div className="error-message">
                          {registerFormik.errors.academyEmail}
                        </div>
                      )}
                  </div>
                  <div className="form-group">
                    <label>رقم الهاتف</label>
                    <input
                      type="tel"
                      name="academyPhone"
                      value={registerFormik.values.academyPhone}
                      onChange={registerFormik.handleChange}
                      onBlur={registerFormik.handleBlur}
                      placeholder="رقم الهاتف"
                      className={
                        registerFormik.touched.academyPhone &&
                        registerFormik.errors.academyPhone
                          ? "error"
                          : ""
                      }
                    />
                    {registerFormik.touched.academyPhone &&
                      registerFormik.errors.academyPhone && (
                        <div className="error-message">
                          {registerFormik.errors.academyPhone}
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <div className="register-form-section">
                <h3><i className="fas fa-lock"></i> كلمة المرور</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>كلمة المرور *</label>
                    <input
                      type="password"
                      name="academyPassword"
                      value={registerFormik.values.academyPassword}
                      onChange={registerFormik.handleChange}
                      onBlur={registerFormik.handleBlur}
                      placeholder="كلمة المرور"
                      className={
                        registerFormik.touched.academyPassword &&
                        registerFormik.errors.academyPassword
                          ? "error"
                          : ""
                      }
                    />
                    {registerFormik.touched.academyPassword &&
                      registerFormik.errors.academyPassword && (
                        <div className="error-message">
                          {registerFormik.errors.academyPassword}
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <div className="register-form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowRegister(false)}
                >
                  <i className="fas fa-times"></i> إلغاء
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={registerFormik.isSubmitting}
                >
                  {registerFormik.isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> جاري التسجيل...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus"></i> تسجيل الأكاديمية
                    </>
                  )}
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
