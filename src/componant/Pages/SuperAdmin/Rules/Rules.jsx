import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import "./Rules.css";

export default function Rules() {
  const [activeTab, setActiveTab] = useState("general");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRule, setNewRule] = useState({ title: "", rule: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const [rulesData, setRulesData] = useState([]);

  const saveRuleToAPI = async (ruleData) => {
    try {
      const response = await axios.post(
        "https://sports.runasp.net/api/Add-Role",
        {
          roleName: ruleData.title,
          roleDescription: ruleData.rule,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Axios automatically throws on HTTP error status
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error saving rule:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "خطأ في حفظ اللائحة";
      return { success: false, error: errorMessage };
    }
  };

  const loadRulesFromAPI = async () => {
    try {
      const response = await axios.get("https://sports.runasp.net/api/Get-Roles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRulesData(response.data);
    } catch (error) {
      console.error("Error loading rules:", error);
      // Keep default rules if API fails
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "خطأ في تحميل اللوائح";
      return { success: false, error: errorMessage };
    }
  };

  const deleteRuleFromAPI = async (ruleId) => {
    try {
        const response = await axios.delete(`https://sports.runasp.net/api/Delete-Role/${ruleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error deleting rule:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "خطأ في حذف اللائحة";
      return { success: false, error: errorMessage };
    }
  };

  const handleAddRule = async () => {
    if (newRule.title && newRule.rule) {
      setIsLoading(true);
      setMessage({ type: "", text: "" });

      // Save to API first
      const apiResult = await saveRuleToAPI(newRule);

      if (apiResult.success) {
        // Update local state
        const updatedRules = { ...rulesData };
        const currentTabRules = [...updatedRules[activeTab]];

        // Check if section already exists
        const existingSectionIndex = currentTabRules.findIndex(
          (section) => section.title === newRule.title
        );

        if (existingSectionIndex >= 0) {
          // Add rule to existing section
          currentTabRules[existingSectionIndex].rules.push(newRule.rule);
        } else {
          // Create new section
          currentTabRules.push({
            title: newRule.title,
            rules: [newRule.rule],
          });
        }

        updatedRules[activeTab] = currentTabRules;
        setRulesData(updatedRules);
        setNewRule({ title: "", rule: "" });
        setShowAddForm(false);
        setMessage({ type: "success", text: "تم حفظ اللائحة بنجاح!" });
      } else {
        setMessage({
          type: "error",
          text: `خطأ في حفظ اللائحة: ${apiResult.error}`,
        });
      }

      setIsLoading(false);
    }
  };

  const handleDeleteRule = async (ruleId) => {
    if (window.confirm("هل أنت متأكد من حذف هذه اللائحة؟")) {
      setIsLoading(true);
      setMessage({ type: "", text: "" });

      // If ruleId is a number (index), we can't delete from API, just remove from local state
      if (typeof ruleId === 'number') {
        const updatedRules = rulesData.filter((_, index) => index !== ruleId);
        setRulesData(updatedRules);
        setMessage({ type: "success", text: "تم حذف اللائحة بنجاح!" });
        setIsLoading(false);
        return;
      }

      const deleteResult = await deleteRuleFromAPI(ruleId);

      if (deleteResult.success) {
        // Remove from local state
        const updatedRules = rulesData.filter(rule => rule.id !== ruleId);
        setRulesData(updatedRules);
        setMessage({ type: "success", text: "تم حذف اللائحة بنجاح!" });
      } else {
        setMessage({
          type: "error",
          text: `خطأ في حذف اللائحة: ${deleteResult.error}`,
        });
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRulesFromAPI();
  }, []);

  return (
    <div className="rules-page" dir="rtl">
      {/* Loading Indicator */}
      {isInitialLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p className="loading-text">جاري تحميل اللوائح...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="rules-header">
        <div className="header-content">
          <h1 className="rules-title">
            <span className="title-icon">📋</span>
            اللوائح التنظيمية للبطولة
          </h1>
          <p className="rules-description">
            قواعد وأنظمة البطولة التي يجب على جميع المشاركين الالتزام بها
          </p>
        </div>
        <div className="header-actions">
          <button
            className="add-rule-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <span className="btn-icon">➕</span>
            {showAddForm ? "إلغاء الإضافة" : "إضافة لائحة"}
          </button>
          <button className="print-btn">
            <span className="btn-icon">🖨️</span>
            طباعة اللوائح
          </button>
          <button className="download-btn">
            <span className="btn-icon">📥</span>
            تحميل PDF
          </button>
        </div>
      </div>

      {/* Add Rule Form */}
      {showAddForm && (
        <div className="add-rule-form">
          <div className="form-header">
            <h3 className="form-title">إضافة لائحة جديدة</h3>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`message ${message.type}`}>
              <span className="message-icon">
                {message.type === "success" ? "✅" : "❌"}
              </span>
              {message.text}
            </div>
          )}

          <div className="form-content">
            <div className="form-group">
              <label className="form-label">عنوان القسم:</label>
              <input
                type="text"
                className="form-input"
                value={newRule.title}
                onChange={(e) =>
                  setNewRule({ ...newRule, title: e.target.value })
                }
                placeholder="مثال: قواعد جديدة"
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label className="form-label">نص اللائحة:</label>
              <textarea
                className="form-textarea"
                value={newRule.rule}
                onChange={(e) =>
                  setNewRule({ ...newRule, rule: e.target.value })
                }
                placeholder="اكتب نص اللائحة هنا..."
                rows="3"
                disabled={isLoading}
              />
            </div>
            <div className="form-actions">
              <button
                className="save-btn"
                onClick={handleAddRule}
                disabled={!newRule.title || !newRule.rule || isLoading}
              >
                <span className="btn-icon">{isLoading ? "⏳" : "💾"}</span>
                {isLoading ? "جاري الحفظ..." : "حفظ اللائحة"}
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowAddForm(false);
                  setNewRule({ title: "", rule: "" });
                  setMessage({ type: "", text: "" });
                }}
                disabled={isLoading}
              >
                <span className="btn-icon">❌</span>
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="rules-tabs">
        <button
          className={`tab-btn ${activeTab === "general" ? "active" : ""}`}
          onClick={() => setActiveTab("general")}
        >
          <span className="tab-icon">⚽</span>
          القواعد العامة
        </button>
        <button
          className={`tab-btn ${activeTab === "technical" ? "active" : ""}`}
          onClick={() => setActiveTab("technical")}
        >
          <span className="tab-icon">🏆</span>
          القواعد الفنية
        </button>
        <button
          className={`tab-btn ${activeTab === "disciplinary" ? "active" : ""}`}
          onClick={() => setActiveTab("disciplinary")}
        >
          <span className="tab-icon">⚖️</span>
          القواعد التأديبية
        </button>
      </div>

      {/* Content */}
      <div className="rules-content">
        {rulesData.map((section, index) => (
          <div key={section.id || index} className="rules-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">📌</span>
                {section.roleName}
              </h2>
              <button
                className="delete-rule-btn"
                onClick={() => handleDeleteRule(section.id || index)}
                disabled={isLoading}
                title="حذف اللائحة"
              >
                <span className="btn-icon">🗑️</span>
                حذف
              </button>
            </div>
            <div className="section-content">
              <p className="section-description">{section.roleDescription}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="rules-footer">
        <div className="footer-content">
          <div className="footer-info">
            <h3 className="footer-title">معلومات مهمة</h3>
            <p className="footer-text">
              هذه اللوائح ملزمة لجميع المشاركين في البطولة. أي مخالفة لهذه
              القواعد قد تؤدي إلى استبعاد الفريق أو اللاعب من البطولة.
            </p>
          </div>
          <div className="footer-contact">
            <h4 className="contact-title">للاستفسارات</h4>
            <p className="contact-info">📧 admin@tournament.com</p>
            <p className="contact-info">📞 +966 50 123 4567</p>
          </div>
        </div>
      </div>
    </div>
  );
}
