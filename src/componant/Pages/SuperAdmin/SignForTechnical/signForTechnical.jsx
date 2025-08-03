"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import "./signForTechnical.css";

function SignForTechnical() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [showTechnicalForm, setShowTechnicalForm] = useState(false);
  const [showMultiPlayerForm, setShowMultiPlayerForm] = useState(false);
  const [players, setPlayers] = useState([
    {
      id: 1,
      pLayerName: "",
      nationality: "",
      birthDate: "",
      possition: "",
      numberShirt: "",
      playerPhoto: null,
      passportPhoto: null,
      category: "",
    },
  ]);

  // Validation schema for player registration
  const playerValidationSchema = Yup.object({
    pLayerName: Yup.string()
      .min(2, "اسم اللاعب يجب أن يكون على الأقل حرفين")
      .required("اسم اللاعب مطلوب"),
    nationality: Yup.string()
      .min(2, "الجنسية مطلوبة")
      .required("الجنسية مطلوبة"),
    birthDate: Yup.date()
      .max(new Date(), "تاريخ الميلاد لا يمكن أن يكون في المستقبل")
      .required("تاريخ الميلاد مطلوب"),
    possition: Yup.string().required("المركز مطلوب"),
    numberShirt: Yup.string().required("رقم القميص مطلوب"),
    category: Yup.string().required("الفئة العمرية مطلوبة"),
    playerPhoto: Yup.mixed().required("الصورة الشخصية مطلوبة"),
    passportPhoto: Yup.mixed().required("صورة جواز السفر مطلوبة"),
  });

  // Validation schema for technical staff registration
  const technicalValidationSchema = Yup.object({
    FullName: Yup.string()
      .min(2, "الاسم الثلاثي يجب أن يكون على الأقل حرفين")
      .required("الاسم الثلاثي مطلوب"),
    AcademyName: Yup.string()
      .min(2, "الأكاديمية مطلوبة")
      .required("الأكاديمية مطلوبة"),
    attribute: Yup.string().required("الصفة مطلوبة"),
    URLImage: Yup.mixed().required("الصورة الشخصية مطلوبة"),
    URLPassport: Yup.mixed().required("صورة جواز السفر مطلوبة"),
  });

  // Player form formik
  const playerFormik = useFormik({
    initialValues: {
      pLayerName: "",
      nationality: "",
      birthDate: "",
      possition: "",
      numberShirt: "",
      playerPhoto: null,
      passportPhoto: null,
      category: "",
    },
    validationSchema: playerValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://sports.runasp.net/api/Add-Players",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setIsSuccess(true);
          resetForm();
          toast.success("تم تسجيل اللاعب بنجاح!");
          setShowPlayerForm(false);
        }
      } catch (error) {
        console.error("Player registration error:", error);
        toast.error("حدث خطأ أثناء تسجيل اللاعب");
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  // Technical staff form formik
  const technicalFormik = useFormik({
    initialValues: {
      FullName: "",
      AcademyName: "",
      attribute: "",
      URLImage: null,
      URLPassport: null,
    },
    validationSchema: technicalValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });
        const response = await axios.post(
          "https://sports.runasp.net/api/Add-Technical-administrative",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          setIsSuccess(true);
          resetForm();
          toast.success("تم تسجيل الجهاز الفني بنجاح!");
          setShowTechnicalForm(false);
        }
      } catch (error) {
        console.error("Technical staff registration error:", error);
        toast.error("حدث خطأ أثناء تسجيل الجهاز الفني");
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  // Functions for multi-player management
  const addPlayer = () => {
    const newPlayer = {
      id: players.length + 1,
      pLayerName: "",
      nationality: "",
      birthDate: "",
      possition: "",
      numberShirt: "",
      playerPhoto: null,
      passportPhoto: null,
      category: "",
    };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (playerId) => {
    if (players.length > 1) {
      setPlayers(players.filter((player) => player.id !== playerId));
    }
  };

  const updatePlayer = (playerId, field, value) => {
    setPlayers(
      players.map((player) =>
        player.id === playerId ? { ...player, [field]: value } : player
      )
    );
  };

  const validateMultiPlayers = () => {
    for (let player of players) {
      if (
        !player.pLayerName ||
        !player.nationality ||
        !player.birthDate ||
        !player.possition ||
        !player.numberShirt ||
        !player.category ||
        !player.playerPhoto ||
        !player.passportPhoto
      ) {
        return false;
      }
    }
    return true;
  };

  const submitMultiPlayers = async () => {
    if (!validateMultiPlayers()) {
      toast.error("يرجى ملء جميع البيانات المطلوبة لكل لاعب");
      return;
    }

    setIsLoading(true);
    try {
      const promises = players.map(async (player) => {
        const { id, ...playerData } = player;

        const request = await axios.post(
          "https://sports.runasp.net/api/Add-Players",
          playerData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        return request;
      });

      await Promise.all(promises);
      setIsSuccess(true);
      toast.success(`تم تسجيل ${players.length} لاعب بنجاح!`);
      setShowMultiPlayerForm(false);
      // Reset players array
      setPlayers([
        {
          id: 1,
          pLayerName: "",
          nationality: "",
          birthDate: "",
          possition: "",
          numberShirt: "",
          playerPhoto: null,
          passportPhoto: null,
          category: "",
        },
      ]);
    } catch (error) {
      console.error("Multi-player registration error:", error);
      toast.error("حدث خطأ أثناء تسجيل اللاعبين");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-header">
        <div className="header-content">
          <h1 className="registration-title">
            <span className="title-icon">👥</span>
            تسجيل اللاعبين والجهاز الإداري والفني
          </h1>
          <p className="registration-description">
            اختر نوع التسجيل المطلوب وقم بملء البيانات المطلوبة
          </p>
        </div>
      </div>

      {/* Registration Type Selection */}
      <div className="registration-options">
        <div className="option-card">
          <div className="option-header">
            <span className="option-icon">👥</span>
            <h3>تسجيل متعدد اللاعبين</h3>
          </div>
          <p className="option-description">
            تسجيل أكثر من لاعب في نفس الوقت بكفاءة
          </p>
          <button
            className="option-btn primary"
            onClick={() => {
              setShowMultiPlayerForm(true);
              setShowPlayerForm(false);
              setShowTechnicalForm(false);
            }}
          >
            <span className="btn-icon">👥</span>
            تسجيل متعدد
          </button>
        </div>

        <div className="option-card">
          <div className="option-header">
            <span className="option-icon">👨‍💼</span>
            <h3>تسجيل الجهاز الفني والإداري</h3>
          </div>
          <p className="option-description">
            تسجيل بيانات الجهاز الفني والإداري
          </p>
          <button
            className="option-btn secondary"
            onClick={() => {
              setShowTechnicalForm(true);
              setShowPlayerForm(false);
              setShowMultiPlayerForm(false);
            }}
          >
            <span className="btn-icon">📝</span>
            ابدأ التسجيل
          </button>
        </div>
      </div>

      {/* Player Registration Form */}

      {/* Multi-Player Registration Form */}
      {showMultiPlayerForm && (
        <div className="form-modal">
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">
                <span className="form-icon">👥</span>
                تسجيل متعدد اللاعبين
              </h2>
              <button
                className="close-btn"
                onClick={() => setShowMultiPlayerForm(false)}
              >
                ×
              </button>
            </div>

            <div className="registration-form">
              <div className="form-section">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <h3 className="section-title">
                    <span className="section-icon">📋</span>
                    اللاعبين ({players.length})
                  </h3>
                  <button
                    type="button"
                    className="btn primary"
                    onClick={addPlayer}
                    style={{ minWidth: "auto", padding: "0.5rem 1rem" }}
                  >
                    <span className="btn-icon">➕</span>
                    إضافة لاعب
                  </button>
                </div>

                {players.map((player, index) => (
                  <div
                    key={player.id}
                    style={{
                      background: "#f8fafc",
                      border: "2px solid #e2e8f0",
                      borderRadius: "16px",
                      padding: "1.5rem",
                      marginBottom: "1.5rem",
                      position: "relative",
                    }}
                  >
                    {/* Player Header */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      <h4
                        style={{
                          color: "#1e293b",
                          margin: 0,
                          fontSize: "1.1rem",
                          fontWeight: "600",
                        }}
                      >
                        🏃‍♂️ اللاعب {index + 1}
                      </h4>
                      {players.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePlayer(player.id)}
                          style={{
                            background: "#dc2626",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "32px",
                            height: "32px",
                            cursor: "pointer",
                            fontSize: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Basic Information */}
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">اسم اللاعب *</label>
                        <input
                          type="text"
                          value={player.pLayerName}
                          onChange={(e) =>
                            updatePlayer(
                              player.id,
                              "pLayerName",
                              e.target.value
                            )
                          }
                          placeholder="أدخل اسم اللاعب"
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">الجنسية *</label>
                        <input
                          type="text"
                          value={player.nationality}
                          onChange={(e) =>
                            updatePlayer(
                              player.id,
                              "nationality",
                              e.target.value
                            )
                          }
                          placeholder="أدخل الجنسية"
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">تاريخ الميلاد *</label>
                        <input
                          type="date"
                          value={player.birthDate}
                          onChange={(e) =>
                            updatePlayer(player.id, "birthDate", e.target.value)
                          }
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">المركز *</label>
                        <select
                          value={player.possition}
                          onChange={(e) =>
                            updatePlayer(player.id, "possition", e.target.value)
                          }
                          className="form-input"
                        >
                          <option value="">اختر المركز</option>
                          <option value="حارس مرمى">حارس مرمى</option>
                          <option value="مدافع">مدافع</option>
                          <option value="لاعب وسط">لاعب وسط</option>
                          <option value="مهاجم">مهاجم</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">رقم القميص *</label>
                        <input
                          type="number"
                          value={player.numberShirt}
                          onChange={(e) =>
                            updatePlayer(
                              player.id,
                              "numberShirt",
                              e.target.value
                            )
                          }
                          placeholder="أدخل رقم القميص"
                          min="1"
                          max="99"
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">الفئة العمرية *</label>
                        <select
                          value={player.category}
                          onChange={(e) =>
                            updatePlayer(player.id, "category", e.target.value)
                          }
                          className="form-input"
                        >
                          <option value="">اختر الفئة العمرية</option>
                          <option value="U12">تحت 12 سنة</option>
                          <option value="U14">تحت 14 سنة</option>
                          <option value="U16">تحت 16 سنة</option>
                        </select>
                      </div>
                    </div>

                    {/* File Uploads */}
                    <div className="form-grid" style={{ marginTop: "1rem" }}>
                      <div className="form-group">
                        <label className="form-label">الصورة الشخصية *</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            updatePlayer(
                              player.id,
                              "playerPhoto",
                              e.target.files[0]
                            )
                          }
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">صورة جواز السفر *</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            updatePlayer(
                              player.id,
                              "passportPhoto",
                              e.target.files[0]
                            )
                          }
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => setShowMultiPlayerForm(false)}
                >
                  <span className="btn-icon">✖</span>
                  إلغاء
                </button>
                <button
                  type="button"
                  className="btn primary"
                  onClick={submitMultiPlayers}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      جاري التسجيل...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">✓</span>
                      تسجيل {players.length} لاعب
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Technical Staff Registration Form */}
      {showTechnicalForm && (
        <div className="form-modal">
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">
                <span className="form-icon">👨‍💼</span>
                تسجيل الجهاز الفني والإداري
              </h2>
              <button
                className="close-btn"
                onClick={() => setShowTechnicalForm(false)}
              >
                ×
              </button>
            </div>

            <form
              className="registration-form"
              onSubmit={technicalFormik.handleSubmit}
            >
              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">📋</span>
                  البيانات الأساسية
                </h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">الاسم الثلاثي *</label>
                    <input
                      type="text"
                      name="FullName"
                      value={technicalFormik.values.FullName}
                      onChange={technicalFormik.handleChange}
                      onBlur={technicalFormik.handleBlur}
                      placeholder="أدخل الاسم الثلاثي"
                      className={`form-input ${
                        technicalFormik.touched.FullName &&
                        technicalFormik.errors.FullName
                          ? "error"
                          : ""
                      }`}
                    />
                    {technicalFormik.touched.FullName &&
                      technicalFormik.errors.FullName && (
                        <div className="error-message">
                          {technicalFormik.errors.FullName}
                        </div>
                      )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">الأكاديمية *</label>
                    <input
                      type="text"
                      name="AcademyName"
                      value={technicalFormik.values.AcademyName}
                      onChange={technicalFormik.handleChange}
                      onBlur={technicalFormik.handleBlur}
                      placeholder="أدخل اسم الأكاديمية"
                      className={`form-input ${
                        technicalFormik.touched.AcademyName &&
                        technicalFormik.errors.AcademyName
                          ? "error"
                          : ""
                      }`}
                    />
                    {technicalFormik.touched.AcademyName &&
                      technicalFormik.errors.AcademyName && (
                        <div className="error-message">
                          {technicalFormik.errors.AcademyName}
                        </div>
                      )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">الصفة *</label>
                    <select
                      name="attribute"
                      value={technicalFormik.values.attribute}
                      onChange={technicalFormik.handleChange}
                      onBlur={technicalFormik.handleBlur}
                      className={`form-input ${
                        technicalFormik.touched.attribute &&
                        technicalFormik.errors.attribute
                          ? "error"
                          : ""
                      }`}
                    >
                      <option value="">اختر الصفة</option>
                      <option value="مدرب">مدرب</option>
                      <option value="مدرب مساعد">مدرب مساعد</option>
                      <option value="مدير إداري">مدير إداري</option>
                      <option value="أخصائي علاج طبيعي">
                        أخصائي علاج طبيعي
                      </option>
                      <option value="طبيب">طبيب</option>
                      <option value="مدير فني">مدير فني</option>
                    </select>
                    {technicalFormik.touched.attribute &&
                      technicalFormik.errors.attribute && (
                        <div className="error-message">
                          {technicalFormik.errors.attribute}
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">
                  <span className="section-icon">📷</span>
                  الوثائق المطلوبة
                </h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">الصورة الشخصية *</label>
                    <div className="file-upload-area">
                      <input
                        type="file"
                        name="URLImage"
                        accept="image/*"
                        onChange={(event) => {
                          technicalFormik.setFieldValue(
                            "URLImage",
                            event.currentTarget.files[0]
                          );
                        }}
                        className="file-input"
                        id="URLImage"
                      />
                      <label htmlFor="URLImage" className="file-label">
                        <span className="file-icon">📷</span>
                        <span className="file-text">اختر الصورة الشخصية</span>
                      </label>
                    </div>
                    {technicalFormik.touched.URLImage &&
                      technicalFormik.errors.URLImage && (
                        <div className="error-message">
                          {technicalFormik.errors.URLImage}
                        </div>
                      )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">صورة جواز السفر *</label>
                </div>
                <div className="file-upload-area">
                  <input
                    type="file"
                    name="URLPassport"
                    accept="image/*"
                    onChange={(event) => {
                      technicalFormik.setFieldValue(
                        "URLPassport",
                        event.currentTarget.files[0]
                      );
                    }}
                    className="file-input"
                    id="URLPassport"
                  />
                  <label htmlFor="URLPassport" className="file-label">
                    <span className="file-icon">📷</span>
                    <span className="file-text">اختر صورة جواز السفر</span>
                  </label>
                </div>
                {technicalFormik.touched.URLPassport &&
                  technicalFormik.errors.URLPassport && (
                    <div className="error-message">
                      {technicalFormik.errors.URLPassport}
                    </div>
                  )}
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => setShowTechnicalForm(false)}
                >
                  <span className="btn-icon">✖</span>
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="btn primary"
                  disabled={isLoading || technicalFormik.isSubmitting}
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      جاري التسجيل...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">✓</span>
                      تسجيل العضو
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Message */}
      {isSuccess && (
        <div className="success-message">
          <div className="success-content">
            <span className="success-icon">✅</span>
            <h3>تم التسجيل بنجاح!</h3>
            <p>تم حفظ البيانات بنجاح في النظام</p>
            <button className="btn primary" onClick={() => setIsSuccess(false)}>
              موافق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignForTechnical;
