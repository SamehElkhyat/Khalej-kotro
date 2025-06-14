'use client'
import React from "react";
import "./Info.css";

function Info() {
  return (
    <div className="container">
      {/* Main Content */}
      <div className="main-content">
        <h1 className="main-title">(الالتزامات) خليجيه كواترو 2025</h1>

        {/* Participation Conditions Section */}
        <div className="section conditions-section">
          <div className="section-header">
            <span className="icon">📋</span>
            <h3>شروط المشاركة</h3>
          </div>
          <ul className="conditions-list">
            <li>يحق لكل أكاديمية المشاركة بثلاث فئات كحد أقصى</li>
            <li>يجب أن تقدم كل أكاديمية قائمة باللاعبين قبل أسبوع من بدء البطولة</li>
            <li>يجب أن تلتزم الأكاديميات بالفئات العمرية المحددة للبطولة</li>
            <li>يحق للجنة التنظيمية مراجعة أوراق اللاعبين والتأكد من أعمارهم</li>
            <li>يجب على جميع اللاعبين ارتداء الزي الرسمي للأكاديمية خلال المباريات</li>
          </ul>
        </div>

        {/* Prizes Section */}
        <div className="section prizes-section">
          <div className="section-header">
            <span className="icon">🏆</span>
            <h3>الجوائز</h3>
          </div>
          <ul className="prizes-list">
            <li>كأس البطولة للفريق الفائز في كل فئة</li>
            <li>ميداليات ذهبية للفريق الفائز وفضية للوصيف</li>
            <li>جائزة أفضل لاعب في البطولة لكل فئة</li>
            <li>جائزة هداف البطولة لكل فئة</li>
            <li>جائزة أفضل حارس مرمى لكل فئة</li>
            <li>جائزة الروح الرياضية للفريق المثالي</li>
          </ul>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        {/* Place Section */}
        <div className="section">
          <div className="section-header">
            <span className="icon">📍</span>
            <h3>العنوان</h3>
          </div>
          <p className="location">
            منطقة مشيرف , شارع الصفيا , بجانب مركز شباب عجمان <br />
            <span className="text-red-500">
              عجمان - الامارات العربية المتحدة
            </span>
          </p>
        </div>

        <div className="section">
          <div className="section-header">
            <span className="icon">📎</span>
            <h3>ATTACHMENTS</h3>
          </div>
          <button className="attachment-btn">
            خليجيه كواترو 2025 - كواترو 2025
          </button>
        </div>

        {/* Layout Section */}
        <div className="section">
          <div className="section-header">
            <span className="icon">📐</span>
            <h3>الموقع</h3>
          </div>
          <div className="layout-image">
            <div className="field-layout">
              {/* Main Field (D) */}
              <div className="field main-field">
                <span className="field-label">D</span>
              </div>

              {/* Side Fields */}
              <div className="side-fields">
                {/* Field A */}
                <div className="field small-field field-a">
                  <span className="field-label">A</span>
                </div>

                {/* Field B */}
                <div className="field small-field field-b">
                  <span className="field-label">B</span>
                </div>

                {/* Field C */}
                <div className="field small-field field-c">
                  <span className="field-label">C</span>
                </div>
              </div>

              {/* Additional facilities */}
              <div className="facilities">
                <div className="facility parking"></div>
                <div className="facility building"></div>
                <div className="facility green-area"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="section">
          <div className="section-header">
            <span className="icon">🤝</span>
            <h3>الرعاه و المساهمين</h3>
          </div>
          <div className="sponsors-grid">
            <p className="sponsor-logo">1</p>
            <p className="sponsor-logo">2</p>
            <p className="sponsor-logo">3</p>
            <p className="sponsor-logo">4</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
